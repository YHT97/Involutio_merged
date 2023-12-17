import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { IUserSlice } from "./reducers/IUserSlice.ts";
import { AuthService } from "../services/authService";
import { DataService } from "../services/dataService.ts";
import { IDepartmentSlice } from "./reducers/IDepartmentSlice.ts";
import { IEmployeeSlice } from "./reducers/IEmployeeSlice.ts";
import { IFullDepartmentSlice } from "./reducers/IFullDepartmentSlice.ts";
import { IFullDepartmentsSlice } from "./reducers/IFullDepartmentsSlice.ts";
import { IReportSlice } from "./reducers/IReportSlice.ts";
import { IReportsSlice } from "./reducers/IReportsSlice.ts";

const rootReducer = combineReducers({
	[AuthService.reducerPath] : AuthService.reducer,
	user : IUserSlice.reducer,
	[DataService.reducerPath] : DataService.reducer,
	department : IDepartmentSlice.reducer,
	employee : IEmployeeSlice.reducer,
	fullDepartment : IFullDepartmentSlice.reducer,
	fullDepartments : IFullDepartmentsSlice.reducer,
	report : IReportSlice.reducer,
	reports : IReportsSlice.reducer
})

export const setupStore = () => configureStore({
	reducer : rootReducer,
	middleware : (getDefaultMiddleware) => {
		return getDefaultMiddleware().prepend(AuthService.middleware).prepend(DataService.middleware)
	}
})

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']