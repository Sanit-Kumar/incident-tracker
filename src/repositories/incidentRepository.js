const pool = require("../config/db");

const createIncident = async (
  title,
  description,
  type,
  severity,
  createdBy,
) => {
  const query = `
    INSERT INTO incidents (
      title,
      description,
      type,
      severity,
      created_by
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const values = [title, description, type, severity, createdBy];

  const result = await pool.query(query, values);

  return result.rows[0];
};

const getIncidentsByUserId = async (userId) => {
  const query = `
    SELECT *
    FROM incidents
    WHERE created_by = $1
    ORDER BY created_at DESC
  `;

  const result = await pool.query(query, [userId]);

  return result.rows;
};

const getIncidentById = async (incidentId, userId) => {
  const query = `
    SELECT *
    FROM incidents
    WHERE id = $1
    AND created_by = $2
  `;

  const result = await pool.query(query, [incidentId, userId]);

  return result.rows[0];
};

const getAllIncidents = async () => {
  const query = `
    SELECT *
    FROM incidents
    ORDER BY created_at DESC
  `;

  const result = await pool.query(query);

  return result.rows;
};

const updateIncidentStatus = async (incidentId, status, adminNotes) => {
  const query = `
    UPDATE incidents
    SET
      status = $1,
      admin_notes = $2,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $3
    RETURNING *;
  `;

  const result = await pool.query(query, [status, adminNotes, incidentId]);

  return result.rows[0];
};

const getDashboardStats = async () => {
  const query = `
    SELECT
      COUNT(*) AS total_incidents,

      COUNT(*) FILTER (
        WHERE status = 'open'
      ) AS open_incidents,

      COUNT(*) FILTER (
        WHERE status = 'in_progress'
      ) AS in_progress_incidents,

      COUNT(*) FILTER (
        WHERE status = 'resolved'
      ) AS resolved_incidents,

      COUNT(*) FILTER (
        WHERE severity = 'high'
      ) AS high_severity_incidents

    FROM incidents;
  `;

  const result = await pool.query(query);

  return result.rows[0];
};

module.exports = {
  createIncident,
  getIncidentsByUserId,
  getIncidentById,
  getAllIncidents,
  updateIncidentStatus,
  getDashboardStats,
};
