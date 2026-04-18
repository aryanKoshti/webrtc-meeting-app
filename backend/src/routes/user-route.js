import { Router } from "express";
import { register, login } from "../controllers/user-controller.js";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.get("/get_all_activity", (req, res) => {
    res.send("activity route");
});

export default router;