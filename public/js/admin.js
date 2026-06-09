const role = localStorage.getItem("role");

if (role !== "admin") {
  window.location.href = "login.html";
}

const totalIncidents = document.getElementById("totalIncidents");

if (totalIncidents) {
  const loadStats = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch("/api/admin/stats", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    document.getElementById("totalIncidents").innerText =
      data.stats.total_incidents;

    document.getElementById("openIncidents").innerText =
      data.stats.open_incidents;

    document.getElementById("resolvedIncidents").innerText =
      data.stats.resolved_incidents;

    document.getElementById("highSeverity").innerText =
      data.stats.high_severity_incidents;
  };

  loadStats();
}

const adminLogoutBtn = document.getElementById("adminLogoutBtn");

if (adminLogoutBtn) {
  adminLogoutBtn.addEventListener("click", () => {
    localStorage.clear();

    window.location.href = "login.html";
  });
}
const adminIncidentTable = document.getElementById("adminIncidentTable");

if (adminIncidentTable) {
  const loadIncidents = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch("/api/admin/incidents", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    adminIncidentTable.innerHTML = "";

    data.incidents.forEach((incident) => {
      adminIncidentTable.innerHTML += `
            <tr>

              <td>${incident.id}</td>

              <td>${incident.title}</td>

              <td>${incident.type}</td>

              <td>${incident.severity}</td>

              <td>${incident.status}</td>

              <td>${incident.created_by}</td>

            </tr>
          `;
    });
  };

  loadIncidents();
}
const employeeForm = document.getElementById("employeeForm");

if (employeeForm) {
  employeeForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const name = document.getElementById("name").value;

    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;

    const response = await fetch("/api/admin/users", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();

    document.getElementById("message").innerText = data.message;
  });
}
