import express from "express";
import controller from "../../../../controllers/auth/index.js";
import authMiddleware from "../../../../middlewares/auth/index.js";

const router = express.Router();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/protect", authMiddleware.jwtConfirm, controller.protect);

export default router;