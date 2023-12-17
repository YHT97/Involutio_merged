export interface IReport {
	id : number;
	name : string;
	type : string;
	date : string;
	manager_id : number;
	processed : boolean;
	worker_fio : string;
}

export interface IReports {
	value : Array<IReport>,
	selectedId : number,
	selectedOption : string
}