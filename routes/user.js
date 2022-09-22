import express from "express";
const router = express.Router();

import { login, signup, update } from "../controllers/user.js";

router.post("/login", login);
router.post("/signup", signup);
router.post("/updateProfile", update);

export default router;