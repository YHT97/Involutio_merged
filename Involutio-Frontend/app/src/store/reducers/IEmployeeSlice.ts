import { IEmployee } from "../../models/IEmployee.ts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState : IEmployee = {
	id: 0,
	fio: "nothing",
	mail: "nothing",
	managerId: 0,
	rating: 0,
	speciality: "nothing",
	regression_k: 0,
	regression_b: 0
}

export const IEmployeeSlice = createSlice({
	name : "employee",
	initialState,
	reducers : {
		setId : (state, action : PayloadAction<number>) => {
			state.id = action.payload
		},
		setFio : (state, action : PayloadAction<string>) => {
			state.fio = action.payload
		},
		setMail : (state, action : PayloadAction<string>) => {
			state.mail = action.payload
		},
		setManagerId : (state, action : PayloadAction<number>) => {
			state.managerId = action.payload
		},
		setRating : (state, action : PayloadAction<number>) => {
			state.rating = action.payload
		},
		setSpeciality : (state, action : PayloadAction<string>) => {
			state.speciality = action.payload
		},
		setRegressions : (state, action : PayloadAction<{regressionK: number, regressionB: number}>) => {
			state.regression_k = action.payload.regressionK
			state.regression_b = action.payload.regressionB
		}
	}
})

export const {
	setId,
	setFio,
	setMail,
	setManagerId,
	setRating,
	setSpeciality,
	setRegressions
} = IEmployeeSlice.actions