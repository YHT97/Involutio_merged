import { useState } from "react";
import { motion } from "framer-motion";
import { useAppSelector } from "../../hooks/redux.ts";
import { useGetDepartmentsQuery, useGetEmployeesQuery } from "../../services/dataService.ts";
import { EUserRole } from "../../models/EUserRole.ts";
import { IEmployee } from "../../models/IEmployee.ts";

import LineInformationCard from "../../components/lineInformationCard";
import DropdownMenu from "../../components/dropdownMenu.tsx";

export default function EmployeesPage() {
	const USER = useAppSelector((state) => state.user);
	const departmentsQuery = useGetDepartmentsQuery("");

	//@ts-ignore
	const [selectedOption, setSelectedOption]
		= useState<string>("");
	const [selectedId, setSelectedId]
		= useState<number>(0);
	const [sortButtonsDisplay, setSortButtonsDisplay]
		= useState<boolean>(USER.role !== EUserRole.admin)
	const [sortedEmployees, setSortedEmployees]
		= useState<readonly IEmployee[]>([]);
	const [selectedSort, setSelectedSort]
		= useState('');


	//@ts-ignore
	let employeesQuery;
	if (USER.role === EUserRole.manager) employeesQuery = useGetEmployeesQuery(USER.id);
	else employeesQuery = useGetEmployeesQuery(selectedId || -1);

	const options = departmentsQuery.data?.map((value) => ({
		value: value.department,
		label: value.department,
		id: value.id,
	})) || [];

	const handleOptionSelect = (selectedValue: string) => {
		const selectedDepartment = options.find(
			(option) => option.value === selectedValue
		);
		if (selectedDepartment) {
			setSortButtonsDisplay(true)
			setSelectedOption(selectedValue);
			setSelectedId(selectedDepartment.id);
		}
	};

	const sortEmployeesByName = () => {
		//@ts-ignore
		const sorted = [...employeesQuery?.data].sort((a, b) =>
			a.fio.localeCompare(b.fio)
		);
		setSelectedSort('ФИО')
		setSortedEmployees(sorted);
	};

	const sortEmployeesBySpeciality = () => {
		//@ts-ignore
		const sorted = [...employeesQuery.data].sort((a, b) =>
			a.speciality.localeCompare(b.speciality)
		);
		setSelectedSort('Специальности')
		setSortedEmployees(sorted);
	};

	const sortEmployeesByRating = () => {
		//@ts-ignore
		const sorted = [...employeesQuery.data].sort((a, b) => b.rating - a.rating);
		setSelectedSort('Вероятности увольнения');
		setSortedEmployees(sorted);
	};

	return (
		<div className={"employees"}>
			<motion.h2
				className={"employees--title"}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.1, duration: 0.5 }}
			>Сотрудники</motion.h2>
			<motion.div
				className={"employees--content"}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
			>
				<div className={"heading-wrapper"}>
					<motion.div
						className={"attributes"}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
					>
						<p className={"attributes--path"}>1 - фио сотрудника</p>
						<p className={"attributes--path"}>2 - должность</p>
						<p className={"attributes--path"}>3 - вероятность увольнения</p>
					</motion.div>
					{USER.role !== EUserRole.admin ? (
						<></>
					) : (
						<DropdownMenu
							defaultSelected={"Выберите отдел"}
							options={options}
							onSelectOption={handleOptionSelect}
						/>
					)}
				</div>
				<motion.div className={'sort-buttons'}
				            initial={{opacity: 0, display: "none"}}
				            animate={{
					            opacity: sortButtonsDisplay ? 1 : 0,
					            display: sortButtonsDisplay ? "flex" : "none",
				            }}
				            exit={{opacity: 0, display: "none"}}
				            transition={{duration: 0.5}}
				>
					<motion.button
						className={`sort-buttons--button ${
							selectedSort === 'ФИО' ? 'sort-buttons--button__selected' : ''
						}`}
						initial={{opacity: 0}}
						animate={{opacity: 1}}
						transition={{duration: 0.5}}
						onClick={sortEmployeesByName}
					>
						Сортировка по <strong>ФИО</strong>
					</motion.button>
					<motion.button
						className={`sort-buttons--button ${
							selectedSort === 'Специальности' ? 'sort-buttons--button__selected' : ''
						}`}
						initial={{opacity: 0}}
						animate={{opacity: 1}}
						transition={{duration: 0.5}}
						onClick={sortEmployeesBySpeciality}
					>
						Сортировка по <strong>Специальности</strong>
					</motion.button>
					<motion.button
						className={`sort-buttons--button ${
							selectedSort === 'Вероятности увольнения' ? 'sort-buttons--button__selected' : ''
						}`}
						initial={{opacity: 0}}
						animate={{opacity: 1}}
						transition={{duration: 0.5}}
						onClick={sortEmployeesByRating}
					>
						Сортировка по <strong>Вероятности увольнения</strong>
					</motion.button>
				</motion.div>
				<div className={"employees--cards"}>
					{employeesQuery.isSuccess && employeesQuery.data.length > 0 ? (
						<>
							{(sortedEmployees.length > 0 ? sortedEmployees : employeesQuery.data).map((value, index) => (
								<div key={index}>
									<LineInformationCard
										type="employee"
										name={value.fio}
										secondColumn={value.speciality}
										thirdColumn={`Вероятность ${value.rating}%`}
										id={value.id}
										initialY={10 + index * 5}
										link={`/application/employee/${value.id}`}
									/>
								</div>
							))}
						</>
					) : (
						<></>
					)}
				</div>
			</motion.div>
		</div>
	);
}