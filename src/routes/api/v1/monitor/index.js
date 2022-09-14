import express from "express";
import monitorController from "../../../../controllers/monitor/index.js"
import authMiddleware from "../../../../middlewares/auth/index.js"

const router = express.Router();

router.get('/:id', authMiddleware.jwtConfirm, monitorController.getMonitorById)
router.get('/', authMiddleware.jwtConfirm, monitorController.getAllMonitors)
router.post('/', authMiddleware.jwtConfirm, monitorController.createMonitor)
router.put('/', authMiddleware.jwtConfirm, monitorController.updateMonitor)
router.delete('/', authMiddleware.jwtConfirm, monitorController.deleteMonitor)

export default router;