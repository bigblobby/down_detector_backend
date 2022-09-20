import express from 'express';
import monitorController from '../../../../controllers/monitor/index.js';
import joiMiddleware from '../../../../middlewares/validation/joi.js';
import monitorSchema from '../../../../validators/joi/monitorSchema.js';
import guard from '../../../../guards/index.js';
import errorHandler from '../../../../utils/errors/handler/errorHandler.js';

const router = express.Router();

router.get('/', guard.jwt, errorHandler(monitorController.getAllMonitors))
router.post('/', guard.jwt, joiMiddleware(monitorSchema.createMonitor), errorHandler(monitorController.createMonitor))
router.put('/:id', guard.jwt, joiMiddleware(monitorSchema.updateMonitor), errorHandler(monitorController.updateMonitor))
router.get('/:id', guard.jwt, errorHandler(monitorController.getMonitorById))
router.delete('/:id', guard.jwt, errorHandler(monitorController.deleteMonitor))

export default router;