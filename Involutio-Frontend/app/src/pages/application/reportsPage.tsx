import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/redux.ts";
import { motion } from "framer-motion";
import {
	useGetDepartmentsQuery,
	useGetReportsQuery,
} from "../../services/dataService";
import {
	clearData,
	setData,
	setSelectedDepartment,
} from "../../store/reducers/IReportsSlice";
import { EUserRole } from "../../models/EUserRole";

import LineInformationCard from "../../components/lineInformationCard";
import DropdownMenu from "../../components/dropdownMenu";

export default function EmployeesPage() {
	const dispatch = useDispatch();
	const USER = useAppSelector((state) => state.user);
	const REPORTS = useAppSelector((state) => state.reports);

	const departmentsQuery = useGetDepartmentsQuery("");
	const reportsQuery = useGetReportsQuery("");

	const options = departmentsQuery.data?.map((value) => ({
		value: value.department,
		label: value.department,
		id: value.id,
	})) || [];

	const handleOptionSelect = (selectedValue : string) => {
		const selectedDepartment = options.find(
			(option) => option.value === selectedValue
		);
		if (selectedDepartment) {
			dispatch(
				setSelectedDepartment({
					id: selectedDepartment.id,
					option: selectedValue,
				})
			);
		}
	};

	useEffect(() => {
		if (USER.role === EUserRole.admin) {
			if (REPORTS.selectedId === 0) {
				dispatch(clearData([]));
			}
		}
		if (USER.role === EUserRole.manager) {
			if (REPORTS.selectedId === 0 || REPORTS.selectedId !== USER.id) {
				dispatch(clearData([]));
				dispatch(
					setSelectedDepartment({
						id: USER.id,
						option: "",
					})
				);
			}
		}
	}, [USER.role, USER.id]);

	useEffect(() => {
		if (reportsQuery.isSuccess) {
			dispatch(clearData([]))
			const filteredReports = reportsQuery.data.filter(
				(value) =>
					(value.manager_id === REPORTS.selectedId &&
						value.date === new Date().toISOString().split("T")[0])
			);
			filteredReports.forEach(async (value) => {
				const workerFio = await getWorkerFio(
					Number(parseValueFromFileName(value.name))
				);
				dispatch(
					setData({
						date: value.date,
						id: value.id,
						manager_id: value.manager_id,
						name: value.name,
						processed: value.processed,
						type: value.type,
						worker_fio: String(workerFio),
					})
				);
			});
		}
	}, [reportsQuery, REPORTS.selectedId]);

	const getWorkerFio = async (workerId : number) => {
		try {
			const response = await fetch(
				`https://involutio.the-omnia.ru/api/v3/worker/${workerId}`,
				{
					headers: {
						"Content-Type": "application/json",
					},
					method: "GET",
				}
			);
			if (response.ok) {
				const data = await response.json();
				return data.fio;
			}
		} catch (error) {
			console.log(error);
		}
	};

	const parseValueFromFileName = (fileName : string) => {
		const startIndex = fileName.indexOf("_");
		const endIndex = fileName.indexOf(".pdf");
		if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex)
			return fileName.substring(startIndex + 1, endIndex);
		return "";
	};

	const renderReports = () => {
		if (reportsQuery.isSuccess) {
			return REPORTS.value.map((value, index) => (
				<div key={index}>
					<LineInformationCard
						type="report"
						name={value.worker_fio}
						secondColumn={value.date}
						thirdColumn={`от ${new Date(
							Date.now() - 7 * 24 * 60 * 60 * 1000
						).toISOString().split("T")[0]} до ${new Date().toISOString().split(
							"T"
						)[0]}`}
						id={value.id}
						initialY={10 + index * 5}
						link={`https://involutio.the-omnia.ru/api/v3/files/download?fileId=${value.id}`}
					/>
				</div>
			));
		} else {
			return null;
		}
	};

	return (
		<div className="reports">
			<motion.h2
				className="reports--title"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.1, duration: 0.5 }}
			>Отчёты</motion.h2>
			<motion.div
				className="reports--content"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
			>
				<div className="heading-wrapper">
					<motion.div
						className="attributes"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
					>
						<p className="attributes--path">1 - фио сотрудника</p>
						<p className="attributes--path">2 - дата создания отчёта</p>
						<p className="attributes--path">3 - временной период</p>
					</motion.div>
					{USER.role !== EUserRole.admin ? (
						<></>
					) : (
						<DropdownMenu
							defaultSelected="Выберите отдел"
							options={options}
							onSelectOption={handleOptionSelect}
						/>
					)}
				</div>
				<div className="reports--cards">{renderReports()}</div>
			</motion.div>
		</div>
	);
}