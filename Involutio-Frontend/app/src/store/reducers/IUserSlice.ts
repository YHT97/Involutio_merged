import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser";
import { EUserRole } from "../../models/EUserRole.ts";

const initialState : IUser = {
	id: 0,
	fio: "nothing",
	login : "nothing",
	role : EUserRole.non
}

export const IUserSlice = createSlice({
	name : "user",
	initialState,
	reducers : {
		setName : (state, action : PayloadAction<string>) => {
			state.fio = action.payload
		},
		setLogin : (state, action : PayloadAction<string>) => {
			state.login = action.payload
		},
		setRole : (state, action : PayloadAction<EUserRole>) => {
			state.role = action.payload
		},
		setId : (state, action : PayloadAction<number>) => {
			state.id = action.payload
		}
	}
})

export const {
	setName,
	setLogin,
	setRole,
	setId
} = IUserSlice.actions