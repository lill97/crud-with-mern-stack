import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteUser } from "../reducers/UserReducer";

function Delete() {
	const { id } = useParams();

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleDelete = (id) => {
		axios
			.delete(`http://localhost:3001/delete/${id}`)
			.then((res) => {
				dispatch(deleteUser({ id }));
			})
			.catch((err) => console.log(err));

		navigate("/");
	};

	return (
		<>
			<h1 className=" fw-normal  m-4">Delete User</h1>
			<Card
				className="d-flex aligns-items-center justify-content-center card text-center w-50 mx-auto"
				border="info"
				style={{ width: "18rem" }}
			>
				<Card.Body>
					<Card.Title className="fs-3 mb-5">
						Are You Sure You want to delete this book?
					</Card.Title>

					<Button
						className="w-75 p-3 mb-2"
						style={{ backgroundColor: "rgb(226, 38, 13)", border: "none" }}
						onClick={() => handleDelete(id)}
					>
						Yes, Delete it
					</Button>
				</Card.Body>
			</Card>
		</>
	);
}

export default Delete;
