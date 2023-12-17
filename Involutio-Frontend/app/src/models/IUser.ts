import { EUserRole } from "./EUserRole"

export interface IUser {
	id: number,
	fio: string,
	login: string
	role : EUserRole
}