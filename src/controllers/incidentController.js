const incidentService = require("../services/incidentService");

const createIncident = async (req, res) => {
  try {
    const { title, description, type, severity } = req.body;

    const incident = await incidentService.createIncident(
      title,
      description,
      type,
      severity,
      req.user.id,
    );

    res.status(201).json({
      success: true,
      message: "Incident created successfully",
      incident,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyIncidents = async (req, res) => {
  try {
    const incidents = await incidentService.getMyIncidents(req.user.id);

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

const getIncidentById = async (req, res) => {
  try {
    const incident = await incidentService.getIncidentById(
      req.params.id,
      req.user.id,
    );

    if (!incident) {
      return res.status(404).json({
        success: false,
        message: "Incident not found",
      });
    }

    res.status(200).json({
      success: true,
      incident,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createIncident,
  getMyIncidents,
  getIncidentById,
};
