import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
	name: String,
	email: String,
});

const UserModel = mongoose.model("users", UserSchema);

export default UserModel;
