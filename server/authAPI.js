import { Router } from "express";
const router = Router();
router.post("/logout", async (req, res) => {
	req.session.user = null;
	res.redirect("/");
});

export default router;
