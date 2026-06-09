const role = localStorage.getItem("role");

if (role !== "employee") {
  window.location.href = "login.html";
}

const welcomeText = document.getElementById("welcomeText");

const user = JSON.parse(localStorage.getItem("user"));

if (welcomeText && user) {
  welcomeText.innerText = `Welcome ${user.name}`;
}

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.clear();

    window.location.href = "login.html";
  });
}

const incidentForm = document.getElementById("incidentForm");

if (incidentForm) {
  incidentForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const title = document.getElementById("title").value;

    const description = document.getElementById("description").value;

    const type = document.getElementById("type").value;

    const severity = document.getElementById("severity").value;

    const response = await fetch("/api/incidents", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        title,
        description,
        type,
        severity,
      }),
    });

    const data = await response.json();

    document.getElementById("message").innerText = data.message;
  });
}

const incidentTableBody = document.getElementById("incidentTableBody");

if (incidentTableBody) {
  const loadIncidents = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch("/api/incidents/my", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    incidentTableBody.innerHTML = "";

    data.incidents.forEach((incident) => {
      incidentTableBody.innerHTML += `
        <tr>
          <td>${incident.id}</td>
          <td>${incident.title}</td>
          <td>${incident.type}</td>
          <td>${incident.severity}</td>
          <td>${incident.status}</td>
          <td>
            <a href="incident-details.html?id=${incident.id}">
              View
            </a>
          </td>
        </tr>
      `;
    });
  };

  loadIncidents();
}

const incidentDetails = document.getElementById("incidentDetails");

if (incidentDetails) {
  const loadIncident = async () => {
    const params = new URLSearchParams(window.location.search);

    const id = params.get("id");

    const token = localStorage.getItem("token");

    const response = await fetch(`/api/incidents/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    const incident = data.incident;

    incidentDetails.innerHTML = `
    <div class="info">
      <span class="label">Title:</span>
      ${incident.title}
    </div>

    <div class="info">
      <span class="label">Description:</span>
      ${incident.description}
    </div>

    <div class="info">
      <span class="label">Type:</span>
      ${incident.type}
    </div>

    <div class="info">
      <span class="label">Severity:</span>
      ${incident.severity}
    </div>

    <div class="info">
      <span class="label">Status:</span>
      ${incident.status}
    </div>

    <div class="info">
      <span class="label">Admin Notes:</span>
      ${incident.admin_notes || "N/A"}
    </div>
  `;
  };

  loadIncident();
}
