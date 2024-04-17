import express from "express";
import UserModel from "../models/User.js";

// const app = express.App();
const app = express();

//Get All Users from database
app.get("/", async (req, res) => {
	try {
		const Users = await UserModel.find({});

		return res.status(200).json({
			count: Users.length,
			data: Users,
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).send({ message: error.message });
	}
});

//Add  User to database
app.post("/create", async (req, res) => {
	try {
		if (!req.body.name || !req.body.email) {
			return res
				.status(400)
				.send({ message: "Send all required fields: name, email" });
		}
		const newUser = {
			name: req.body.name,
			email: req.body.email,
		};

		const user = await UserModel.create(newUser);

		return res.status(201).send(user);
	} catch (error) {
		console.log(error.message);
		res.status(500).send({ message: error.message });
	}
});

//Update a User
app.put("/edit/:id", async (req, res) => {
	try {
		if (!req.body.name || !req.body.email) {
			return res.status(400).send({
				message: "Send all required fields: name, email",
			});
		}

		const { id } = req.params;

		const result = await UserModel.findByIdAndUpdate(id, req.body);

		if (!result) {
			return res.status(404).json({ message: "User not found" });
		}

		return res.status(200).send(result);
	} catch (error) {
		console.log(error.message);
		res.status(500).send({ message: error.message });
	}
});

// Delete a User
app.delete("/delete/:id", async (req, res) => {
	try {
		const { id } = req.params;

		const result = await UserModel.findByIdAndDelete(id);

		if (!result) {
			return res.status(404).json({ message: "User not found" });
		}

		return res.status(200).send(result);
	} catch (error) {
		console.log(error.message);
		res.status(500).send({ message: error.message });
	}
});

export default app;
