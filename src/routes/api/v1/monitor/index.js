import express from 'express';
import monitorController from '../../../../controllers/monitor/index.js';
import authMiddleware from '../../../../middlewares/auth/index.js';
import joiMiddleware from '../../../../middlewares/validation/joi.js';
import monitorSchemas from '../../../../validators/joi/monitorSchemas.js';

const router = express.Router();

router.get('/', authMiddleware.jwtConfirm, monitorController.getAllMonitors)
router.post('/', authMiddleware.jwtConfirm, joiMiddleware(monitorSchemas.createMonitor), monitorController.createMonitor)
router.put('/:id', authMiddleware.jwtConfirm, joiMiddleware(monitorSchemas.updateMonitor), monitorController.updateMonitor)
router.get('/:id', authMiddleware.jwtConfirm, monitorController.getMonitorById)
router.delete('/:id', authMiddleware.jwtConfirm, monitorController.deleteMonitor)

export default router;