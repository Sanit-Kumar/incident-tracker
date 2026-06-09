const express = require("express");

const router = express.Router();

const adminController = require("../controllers/adminController");

const authMiddleware = require("../middleware/authMiddleware");

const adminMiddleware = require("../middleware/adminMiddleware");

router.get(
  "/incidents",
  authMiddleware,
  adminMiddleware,
  adminController.getAllIncidents,
);

router.patch(
  "/incidents/:id",
  authMiddleware,
  adminMiddleware,
  adminController.updateIncidentStatus,
);

router.get(
  "/stats",
  authMiddleware,
  adminMiddleware,
  adminController.getDashboardStats,
);

router.post(
  "/users",
  authMiddleware,
  adminMiddleware,
  adminController.createEmployee,
);

module.exports = router;
