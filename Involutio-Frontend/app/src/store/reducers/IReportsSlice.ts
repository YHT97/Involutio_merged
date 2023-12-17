import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IReport, IReports } from "../../models/IReport.ts";

const initialState : IReports = {
	value : [],
	selectedId : 0,
	selectedOption : ""
}

export const IReportsSlice = createSlice({
	name : "full-departments",
	initialState,
	reducers : {
		setData : (state, action : PayloadAction<IReport>) => {
			state.value.push(action.payload)
		},
		clearData : (state, action : PayloadAction<[]>) => {
			state.value = action.payload
		},
		removeData: (state, action: PayloadAction<number>) => {
			const itemId = action.payload;
			state.value = state.value.filter((item) => item.id !== itemId);
		},
		setSelectedDepartment: (state, action: PayloadAction<{ id: number, option: string }>) => {
			state.selectedId = action.payload.id;
			state.selectedOption = action.payload.option;
			state.value = []; // Очищаем значение, чтобы обновить список отчетов
		}
	}
})

export const {
	setData,
	clearData,
	removeData,
	setSelectedDepartment
} = IReportsSlice.actions