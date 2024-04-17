import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "../reducers/UserReducer";
import axios from "axios";

function Update() {
	const { id } = useParams();
	const users = useSelector((state) => state.users);

	const existingUser = users.find((user) => user.id === id);
	const [name, setName] = useState(existingUser.name);
	const [email, setEmail] = useState(existingUser.email);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleUpdate = (event) => {
		event.preventDefault();

		axios
			.put(`http://localhost:3001/edit/${id}`, { name, email })
			.then((res) => {
				dispatch(updateUser({ id, name, email }));
			})
			.catch((err) => console.log(err));

		navigate("/");
	};

	return (
		<div className="d-flex w-100 vh-100 justify-content-center align-items-center">
			<div className="w-50 border bg-secondary text-white p-5">
				<h3>Update User</h3>
				<form onSubmit={handleUpdate}>
					<div>
						<label htmlFor="name">Name:</label>
						<input
							type="text"
							name="name"
							className="form-control"
							placeholder="enter name"
							value={name}
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
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<br />
					<button className="btn btn-info">Update</button>
				</form>
			</div>
		</div>
	);
}

export default Update;
