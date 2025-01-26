import express from "express";
import { login, register, decodeToken } from "../controllers/auth.controller";

const router = express.Router();

router.post("/", decodeToken);
router.post("/login", login);
router.post("/register", register);

export default router;
