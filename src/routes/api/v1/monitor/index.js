import express from "express";
import monitorController from "../../../../controllers/monitor/index.js"
import authMiddleware from "../../../../middlewares/auth/index.js"

const router = express.Router();

router.get('/', authMiddleware.jwtConfirm, monitorController.getAllMonitors)
router.post('/', authMiddleware.jwtConfirm, monitorController.createMonitor)
router.put('/:id', authMiddleware.jwtConfirm, monitorController.updateMonitor)
router.get('/:id', authMiddleware.jwtConfirm, monitorController.getMonitorById)
router.delete('/:id', authMiddleware.jwtConfirm, monitorController.deleteMonitor)

export default router;