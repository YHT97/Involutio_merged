import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.ts";
import { motion } from "framer-motion";
import { useGetDepartmentsQuery } from "../../services/dataService.ts";
import { clearData, setData } from "../../store/reducers/IFullDepartmentsSlice.ts";
import { EUserRole } from "../../models/EUserRole.ts";
import { IFullDepartment } from "../../models/IFullDepartment.ts";

import LineInformationCard from "../../components/lineInformationCard.tsx";

export default function DepartmentsPage() {
	const dispatch = useAppDispatch();

	const USER = useAppSelector((state) => state.user);
	const DEPARTMENTS = useAppSelector((state) => state.fullDepartments);

	const departmentsQuery = useGetDepartmentsQuery("");

	const [sortedDepartments, setSortedDepartments]
		= useState<readonly IFullDepartment[]>([]);
	const [selectedSort, setSelectedSort]
		= useState('');

	const getUser = async (userId: number) => {
		try {
			const response = await fetch(
				`https://involutio.the-omnia.ru/api/v3/user/${userId}`,
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

	useEffect(() => {
		if (USER.role !== EUserRole.admin) {
			window.location.href = "/";
		}
	}, [USER.role]);

	useEffect(() => {
		if (departmentsQuery.isSuccess) {
			const userIds: number[] = departmentsQuery.data.map((value) =>
				Number(value.userId)
			);

			const fetchUserNames = async () => {
				const userNames = await Promise.all(
					userIds.map((userId) => getUser(userId))
				);
				dispatch(clearData([]))
				departmentsQuery.data.forEach((value, index) => {
					dispatch(
						setData({
							department: value.department,
							fio: userNames[index],
							id: value.id,
							rating: value.rating,
							userId: value.userId,
						})
					);
				});
			};
			fetchUserNames();
		}
	}, [departmentsQuery]);

	const sortDepartmentsByName = () => {
		const sorted = [...DEPARTMENTS.value].sort((a, b) =>
			a.department.localeCompare(b.department)
		);
		setSelectedSort('Название')
		setSortedDepartments(sorted);
	};

	const sortDepartmentsByCuratorName = () => {
		const sorted = [...DEPARTMENTS.value].sort((a, b) =>
			a.fio.localeCompare(b.fio)
		);
		setSelectedSort('Куратор')
		setSortedDepartments(sorted);
	};

	const sortDepartmentsByRating = () => {
		const sorted = [...DEPARTMENTS.value].sort((a, b) => b.rating - a.rating);
		setSelectedSort('Средняя вероятность');
		setSortedDepartments(sorted);
	};

	return (
		<>
			<div className={"departments"}>
				<motion.h2
					className={"departments--title"}
					initial={{opacity: 0}}
					animate={{opacity: 1}}
					transition={{delay: 0.1, duration: 0.5}}
				>
					Подразделения
				</motion.h2>
				<div className={"heading-wrapper"}>
					<motion.div
						className={"attributes"}
						initial={{opacity: 0}}
						animate={{opacity: 1}}
						transition={{duration: 0.5}}
						style={{width: "500px"}}
					>
						<p className={"attributes--path"}>1 - название отдела</p>
						<p className={"attributes--path"}>2 - фио куратора отдела</p>
						<p className={"attributes--path"}>
							3 - средний процент заинтересованности
						</p>
					</motion.div>
				</div>
				<motion.div className={'sort-buttons'}
				            initial={{ opacity: 0 }}
				            animate={{ opacity: 1 }}
				            transition={{duration: 0.5}}
				>
					<motion.button
						className={`sort-buttons--button ${
							selectedSort === 'Название' ? 'sort-buttons--button__selected' : ''
						}`}
						initial={{opacity: 0}}
						animate={{opacity: 1}}
						transition={{duration: 0.5}}
						onClick={sortDepartmentsByName}
					>
						Сортировка по <strong>Названию</strong>
					</motion.button>
					<motion.button
						className={`sort-buttons--button ${
							selectedSort === 'Куратор' ? 'sort-buttons--button__selected' : ''
						}`}
						initial={{opacity: 0}}
						animate={{opacity: 1}}
						transition={{duration: 0.5}}
						onClick={sortDepartmentsByCuratorName}
					>
						Сортировка по <strong>ФИО Куратора</strong>
					</motion.button>
					<motion.button
						className={`sort-buttons--button ${
							selectedSort === 'Средняя вероятность' ? 'sort-buttons--button__selected' : ''
						}`}
						initial={{opacity: 0}}
						animate={{opacity: 1}}
						transition={{duration: 0.5}}
						onClick={sortDepartmentsByRating}
					>
						Сортировка по <strong>Средней вероятности</strong>
					</motion.button>
				</motion.div>
				<div className={"departments--cards"}>
					{(sortedDepartments.length > 0 ? sortedDepartments : DEPARTMENTS.value).map((value, index) => (
						<div key={index}>
							<LineInformationCard
								type={"department"}
								name={value.department}
								secondColumn={value.fio}
								thirdColumn={`Средняя вероятность ${value.rating}%`}
								id={1}
								initialY={10 + index * 5}
								link={`/application/department/${value.id}`}
							/>
						</div>
					))}
				</div>
			</div>
		</>
	);
}