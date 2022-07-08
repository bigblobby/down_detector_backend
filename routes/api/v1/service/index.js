const router = require('express').Router();
const controller = require('../../../../controllers/service');
const middleware = require('../../../../middlewares/service');
const {catchAsync} = require("../../../../middlewares/global");

router.post('/check', middleware.preCheckService, catchAsync(controller.checkService));

module.exports = router;