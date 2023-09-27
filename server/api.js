import config  from "./utils/config";
import { Router } from "express";
import fetch from "node-fetch";
import db from "./db";
import logger from "./utils/logger";
import starRouter from "./starAPI";
import registrationRouter from "./registrationAPI";
import userRouter from "./userAPI";
import authRouter from "./authAPI";

const router = Router();

router.get("/", (_, res) => {
	logger.debug("Welcoming everyone...");
	res.json({ message: "Hello, world!" });
});

router.use(userRouter);
router.use(starRouter);
router.use(registrationRouter);
router.use(authRouter);

router.get("/auth/github", async( req, res) => {
	const { code, state } = req.query;
	if(state !== config.client_key) {
		logger.debug("Invalid state: " + state + "<>" + config.client_key);
		res.status(403).send("unauthorized");
		return;
	}

	const baseUrl = "https://github.com/login/oauth/access_token";
	const url = `${baseUrl}?client_id=${config.client_id}&client_secret=${config.client_secret}&code=${code}&scope=read:user`;
    const resp = await fetch (url,
		{
			method: "POST",
			headers: { Accept: "application/json" },
		});
    const data = await resp.json();
	logger.debug(JSON.stringify(data));
	const auth = "Bearer " + data.access_token;
	logger.debug(auth);
	const user_resp = await fetch("https://api.github.com/user", {
		headers: { Authorization: auth },
	});

	const github_user = await user_resp.json();

	// res.send(github_user);
	let result = await db.query("SELECT * FROM users WHERE username=$1", [github_user.login]);
    let user;
	if(result.rowCount === 0 ){
		result = await db.query("INSERT INTO users (username, name, role) VALUES ($1, $2,'student') RETURNING *", [github_user.login, github_user.name]);
		user = result.rows[0];
	} else {
		user = result.rows[0];
	}
	req.session.user = user;

	if(!user.name || !user.role || !user.area || !user.class){
		res.redirect("/register");
	} else {
		res.redirect("/dashboard");
    }
});

export default router;
