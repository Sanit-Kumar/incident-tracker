const incidentRepository = require("../repositories/incidentRepository");

const createIncident = async (title, description, type, severity, userId) => {
  const incident = await incidentRepository.createIncident(
    title,
    description,
    type,
    severity,
    userId,
  );

  return incident;
};

const getMyIncidents = async (userId) => {
  return await incidentRepository.getIncidentsByUserId(userId);
};

const getIncidentById = async (incidentId, userId) => {
  return await incidentRepository.getIncidentById(incidentId, userId);
};

module.exports = {
  createIncident,
  getMyIncidents,
  getIncidentById,
};
