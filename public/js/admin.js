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

          <td>
            <button
            class="manage-btn"
            onclick="openIncidentModal(
              ${incident.id},
              '${incident.status}',
              \`${incident.admin_notes || ""}\`
            )"
            >
            Manage
            </button>
          </td>

        </tr>
      `;
    });
  };

  loadIncidents();

  window.openIncidentModal = (id, status, notes) => {
    document.getElementById("incidentId").value = id;

    document.getElementById("status").value = status;

    document.getElementById("adminNotes").value = notes;

    document.getElementById("updateModal").style.display = "block";
  };

  const closeModalBtn = document.getElementById("closeModalBtn");

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
      document.getElementById("updateModal").style.display = "none";
    });
  }

  const updateIncidentBtn = document.getElementById("updateIncidentBtn");

  if (updateIncidentBtn) {
    updateIncidentBtn.addEventListener("click", async () => {
      const token = localStorage.getItem("token");

      const id = document.getElementById("incidentId").value;

      const status = document.getElementById("status").value;

      const adminNotes = document.getElementById("adminNotes").value;

      const response = await fetch(`/api/admin/incidents/${id}`, {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          status,
          adminNotes,
        }),
      });

      const data = await response.json();

      alert(data.message);

      document.getElementById("updateModal").style.display = "none";

      loadIncidents();
    });
  }
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
