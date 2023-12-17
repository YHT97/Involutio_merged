import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDepartment } from "../../models/IDepartment.ts";

const initialState : IDepartment = {
	id : 0,
	userId : 0,
	department : "отдел такой-то такой",
	rating : 0
}

export const IDepartmentSlice = createSlice({
	name : "department",
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
		}
	}
})

export const {
	setManagerId,
	setUserId,
	setDepartmentName,
	setRating
} = IDepartmentSlice.actions