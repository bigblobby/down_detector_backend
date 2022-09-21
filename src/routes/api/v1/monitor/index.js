import express from 'express';
import monitorController from '../../../../controllers/monitor/index.js';
import joiValidator from '../../../../validators/joi/validator.js';
import monitorSchema from '../../../../validators/joi/schema/monitorSchema.js';
import guard from '../../../../guards/index.js';
import catchAsync from '../../../../utils/catchAsync.js';

const router = express.Router();

router.get('/', guard.jwt, catchAsync(monitorController.getAllMonitors))
router.post('/', guard.jwt, joiValidator(monitorSchema.createMonitor), catchAsync(monitorController.createMonitor))
router.put('/:id', guard.jwt, joiValidator(monitorSchema.updateMonitor), catchAsync(monitorController.updateMonitor))
router.get('/:id', guard.jwt, catchAsync(monitorController.getMonitorById))
router.delete('/:id', guard.jwt, catchAsync(monitorController.deleteMonitor))

export default router;