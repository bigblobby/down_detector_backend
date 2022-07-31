import express from 'express';
import controller from '../../../../controllers/service/index.js';
import middleware from '../../../../middlewares/service/index.js';
import globalMiddleware from '../../../../middlewares/global/index.js';
import CheckJWT from "../../../../auth/CheckJWT.js";

const router = express.Router();

router.post('/check', middleware.preCheckService, globalMiddleware.catchAsync(controller.checkService));
router.get('/jwt', CheckJWT, (req, res) => {
    return res.json({
        msg: "Your access token was successfully validated!",
    });
});

export default router