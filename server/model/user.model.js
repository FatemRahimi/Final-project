/* eslint-disable no-console */
 import db from "../db";
 class User {
		constructor( Username ,Name, Role, Class, Area ) {
		this.Name = Name;
		this.Role = Role;
		this.Class = Class;
		this.Area = Area;
		this.Username = Username;
	}

	async add() {
		try {
			// check if user already exists in the DB
			const { rows: existingUser } = await db.query(
				"SELECT * FROM users WHERE username = $1",
				[this.Username]
			);
			if (existingUser.length) {
				throw new Error("User already exists");
			}

			// save the user to the DB
			const { rows: newUser } = await db.query(
				"INSERT INTO users(Username,Name, Role, Class, Area) VALUES ($1, $2, $3, $4,$5) RETURNING *",
				[this.Username, this.Name, this.Role, this.Class, this.Area]
			);
			return newUser[0];
		} catch (error) {
			console.error(error);
			throw new Error("Internal server error");
		}
	}
	async update() {
		try {
			// check if user already exists in the DB
			const { rows: existingUser } = await db.query(
				"SELECT * FROM users WHERE username = $1",
				[this.Username]
			);
			if (!existingUser.length) {
				throw new Error("User not found");
			}

			const userId = existingUser[0].id;

			// update the user in the DB
			const { rows: updatedUser } = await db.query(
				"UPDATE users SET Name= $1, Role=$2, Class=$3, Area=$4 WHERE id= $5 RETURNING *",
				[this.Name, this.Role, this.Class, this.Area, userId]
			);
			return updatedUser[0];
		} catch (error) {
			console.error(error);
			throw new Error("Internal server error");
		}
	}
	static async getAll() {
		try {
			const { rows: users } = await db.query("SELECT * FROM users");
			return users;
		} catch (error) {
			console.error(error);
			throw new Error("Internal server error");
		}
	}
}

export default User;