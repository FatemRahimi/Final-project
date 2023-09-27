import express from "express";
import session from "express-session";
import pgSessionStore from "connect-pg-simple";
import apiRouter from "./api";
import config from "./utils/config";
import {
	clientRouter,
	configuredHelmet,
	configuredMorgan,
	ensureAuthenticated,
	httpsOnly,
	logErrors,
} from "./utils/middleware";

const apiRoot = "/api";

const app = express();

app.use(express.json());
app.use(configuredHelmet());
app.use(configuredMorgan());

app.use(session({
	store: new (pgSessionStore(session))({
		// insert connect-pg-simple options here
	}),
	secret: config.cookie_secret,
	resave: false,
}));

app.use(ensureAuthenticated());

if (config.production) {
	app.enable("trust proxy");
	app.use(httpsOnly());
}

app.use(apiRoot, apiRouter);
app.use("/health", (_, res) => res.sendStatus(200));

app.use(clientRouter(apiRoot));

app.use(logErrors());

export default app;
