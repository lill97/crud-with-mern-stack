import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "users",
	initialState: [],
	reducers: {
		getUser: (state, action) => {
			return action.payload.data.map((user) => {
				return { id: user._id, name: user.name, email: user.email };
			});
		},
		addUser: (state, action) => {
			state.push(action.payload);
		},
		updateUser: (state, action) => {
			const { id, name, email } = action.payload;
			const userUpdate = state.find((user) => user.id === id);

			if (userUpdate) {
				userUpdate.name = name;
				userUpdate.email = email;
			}
		},
		deleteUser: (state, action) => {
			const { id } = action.payload;
			const userDelete = state.find((user) => user.id === id);
			if (userDelete) {
				return state.filter((user) => user.id !== id);
			}
		},
	},
});

export const { getUser, addUser, updateUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
