import { Router } from "express";

const router = Router();

// Return user info

router.get("/users", async (req, res) => {
    res.json(req.session.user);
});
export default router;
