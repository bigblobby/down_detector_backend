const router = require('express').Router();

router.use('/service', require('./service'));

module.exports = router;