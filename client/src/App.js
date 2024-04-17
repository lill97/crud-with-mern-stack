import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Create from "./pages/Create";
import Update from "./pages/Update";
import Delete from "./pages/Delete";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "./reducers/UserReducer";

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("http://localhost:3001");
				dispatch(getUser(response.data));
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, [dispatch]);

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/create" element={<Create />}></Route>
				<Route path="/edit/:id" element={<Update />}></Route>
				<Route path="/delete/:id" element={<Delete />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
