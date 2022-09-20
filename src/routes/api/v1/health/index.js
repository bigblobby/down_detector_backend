import express from 'express';

const router = express.Router();

router.get('/check', (req, res) => {
    const healthCheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: new Date(Date.now())
    };
    try {
        res.send(healthCheck);
    } catch (error) {
        healthCheck.message = error;
        res.status(503).send();
    }
})

export default router;