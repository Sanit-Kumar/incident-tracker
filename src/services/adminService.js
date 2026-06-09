const bcrypt = require("bcryptjs");
const incidentRepository = require("../repositories/incidentRepository");

const userRepository = require("../repositories/userRepository");

const getAllIncidents = async () => {
  return await incidentRepository.getAllIncidents();
};

const updateIncidentStatus = async (incidentId, status, adminNotes) => {
  return await incidentRepository.updateIncidentStatus(
    incidentId,
    status,
    adminNotes,
  );
};
const getDashboardStats = async () => {
  return await incidentRepository.getDashboardStats();
};

const createEmployee = async (name, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  return await userRepository.createEmployee(name, email, hashedPassword);
};

module.exports = {
  getAllIncidents,
  updateIncidentStatus,
  getDashboardStats,
  createEmployee,
};
