import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/UserRoute.js";

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.use("/", userRouter);

// Connect to Mongo
mongoose
	.connect("mongodb://127.0.0.1:27017/CRUD")
	.then(() => {
		console.log("MongoDB Connected!");
		app.listen(port, () => console.log(`Server started on port ${port}`));
	})
	.catch((err) => console.log(err));
