export interface IFullDepartment {
	id : number,
	userId : number,
	department : string,
	rating : number,
	fio : string
}

export interface IFullDepartments {
	value : Array<IFullDepartment>
}