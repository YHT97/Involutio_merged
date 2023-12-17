import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFullDepartment } from "../../models/IFullDepartment.ts";

const initialState : IFullDepartment = {
	id : 0,
	userId : 0,
	department : "nothing",
	rating : 0,
	fio : "nothing"
}

export const IFullDepartmentSlice = createSlice({
	name : "full-department",
	initialState,
	reducers : {
		setManagerId : (state, action : PayloadAction<number>) => {
			state.id = action.payload
		},
		setUserId : (state, action : PayloadAction<number>) => {
			state.userId = action.payload
		},
		setDepartmentName : (state, action : PayloadAction<string>) => {
			state.department = action.payload
		},
		setRating : (state, action : PayloadAction<number>) => {
			state.rating = action.payload
		},
		setFio : (state, action : PayloadAction<string>) => {
			state.fio = action.payload
		}
	}
})

export const {
	setManagerId,
	setUserId,
	setDepartmentName,
	setRating,
	setFio
} = IFullDepartmentSlice.actions