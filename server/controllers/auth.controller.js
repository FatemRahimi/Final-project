import User from "../model/user.model"; // user model

export const updateUser = async (req, res) => {
	const { username, name, role, section, area } = req.body; // assuming the form data is submitted via POST request with these fields

	// validate user input
	if ( !username || !name || !role || !section || !area) {
		return res.status(400).json({ message: "All fields are required" });
	}

	const user = new User( username, name, role, section, area );
	try {
		const updatedUser = await user.update();
		req.session.user = updatedUser;
		return res.status(201).json({
			message: "User registered successfully",
			data: updatedUser,
		});
	} catch (error) {
		return res.status(409).json({ message: error.message });
	}
};

// read all user in db
export const getAllUsers = async (req, res) => {
	try {
		const users = await User.getAll();
		return res.status(200).json({ data: users });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};