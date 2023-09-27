
export const ensureMentorTA = (req, res, next) => {

	const user = req.session.user;

   //check if the user is a mentor or ta
    if (
        user.role === "TA" ||
        user.role === "mentor"

    ) {
        next();
        return;
    }
    return res.status(401).json({ error: "Unauthorized" });
};