const router = require('express').Router();
const controller = require('../../controllers/service/index');
const middleware = require('../../middlewares/service/index');
const {catchAsync} = require("../../middlewares/global");

router.post('/check', middleware.preCheckService, catchAsync(controller.checkService));

module.exports = router;