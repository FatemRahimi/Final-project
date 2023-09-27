import { Router } from "express";
import { updateUser } from "./controllers/auth.controller";
const router = Router();


router.put("/register", updateUser);

export default router;