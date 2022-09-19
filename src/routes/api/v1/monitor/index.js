import express from 'express';
import monitorController from '../../../../controllers/monitor/index.js';
import joiMiddleware from '../../../../middlewares/validation/joi.js';
import monitorSchemas from '../../../../validators/joi/monitorSchemas.js';
import guard from '../../../../guards/index.js'

const router = express.Router();

router.get('/', guard.jwt, monitorController.getAllMonitors)
router.post('/', guard.jwt, joiMiddleware(monitorSchemas.createMonitor), monitorController.createMonitor)
router.put('/:id', guard.jwt, joiMiddleware(monitorSchemas.updateMonitor), monitorController.updateMonitor)
router.get('/:id', guard.jwt, monitorController.getMonitorById)
router.delete('/:id', guard.jwt, monitorController.deleteMonitor)

export default router;