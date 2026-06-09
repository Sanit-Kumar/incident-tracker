const express = require("express");

const router = express.Router();

const incidentController = require("../controllers/incidentController");

const authMiddleware = require("../middleware/authMiddleware");
router.post("/", authMiddleware, incidentController.createIncident);
router.get("/my", authMiddleware, incidentController.getMyIncidents);
router.get("/:id", authMiddleware, incidentController.getIncidentById);

module.exports = router;
