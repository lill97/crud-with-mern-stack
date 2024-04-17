import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getUser, addUser } from "../reducers/UserReducer";

function Create() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault();

		axios
			.post("http://localhost:3001/create", { name, email })
			.then((res) => {
				dispatch(addUser(res.data));
			})
			.catch((err) => console.log(err));

		navigate("/");

		axios.get("http://localhost:3001").then((res) => dispatch(getUser(res.data)));
	};

	return (
		<div className="d-flex w-100 vh-100 justify-content-center align-items-center">
			<div className="w-50 border bg-secondary text-white p-5">
				<h3>Add New User</h3>
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="name">Name:</label>
						<input
							type="text"
							name="name"
							className="form-control"
							placeholder="enter name"
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="email">Email:</label>
						<input
							type="email"
							name="email"
							className="form-control"
							placeholder="enter email"
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<br />
					<button className="btn btn-info">Submit</button>
				</form>
			</div>
		</div>
	);
}

export default Create;
