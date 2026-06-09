const adminService = require("../services/adminService");

const getAllIncidents = async (req, res) => {
  try {
    const incidents = await adminService.getAllIncidents();

    res.status(200).json({
      success: true,
      incidents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateIncidentStatus = async (req, res) => {
  try {
    const { status, adminNotes } = req.body;

    const incident = await adminService.updateIncidentStatus(
      req.params.id,
      status,
      adminNotes,
    );

    res.status(200).json({
      success: true,
      message: "Incident updated successfully",
      incident,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const stats = await adminService.getDashboardStats();

    res.status(200).json({
      success: true,
      stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createEmployee = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const employee = await adminService.createEmployee(name, email, password);

    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllIncidents,
  updateIncidentStatus,
  getDashboardStats,
  createEmployee,
};
