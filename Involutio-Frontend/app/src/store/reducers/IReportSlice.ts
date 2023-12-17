import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IReport} from "../../models/IReport.ts";

const initialState : IReport = {
	id: 0,
	name: "nothing",
	type: "nothing",
	date: "yyyy-mm-dd",
	manager_id: 0,
	processed: false,
	worker_fio: "nothing"
}

export const IReportSlice = createSlice({
	name : "reports",
	initialState,
	reducers : {
		setId : (state, action : PayloadAction<number>) => {
			state.id = action.payload
		},
		setName : (state, action : PayloadAction<string>) => {
			state.name = action.payload
		},
		setType : (state, action : PayloadAction<string>) => {
			state.type = action.payload
		},
		setDate : (state, action : PayloadAction<string>) => {
			state.date = action.payload
		},
		setManagerId : (state, action : PayloadAction<number>) => {
			state.manager_id = action.payload
		},
		setStatus : (state, action : PayloadAction<boolean>) => {
			state.processed = action.payload
		},
		setWorkerFio : (state, action : PayloadAction<string>) => {
			state.worker_fio = action.payload
		}
	}
})

export const {
	setId,
	setName,
	setType,
	setDate,
	setManagerId,
	setStatus,
	setWorkerFio
} = IReportSlice.actions