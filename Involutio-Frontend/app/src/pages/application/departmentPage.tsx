import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {
	useGetDepartmentInfoQuery,
	useGetEmployeesQuery,
	useGetDepartmentStatQuery,
	useGetUserInfoQuery
} from "../../services/dataService.ts";
import { motion } from "framer-motion";
import { useAppSelector } from "../../hooks/redux.ts";
import { EUserRole } from "../../models/EUserRole.ts";

import LineInformationCard from "../../components/lineInformationCard.tsx";
import Chart from "../../components/chart.tsx";

export default function DepartmentPage() {
	const managerId = useParams()

	const USER = useAppSelector((state) => state.user)

	const employeesQuery = useGetEmployeesQuery(Number(managerId.id))
	const departmentInfoQuery = useGetDepartmentInfoQuery(Number(managerId.id))
	const curatorInfoQuery = useGetUserInfoQuery(Number(managerId.id))
	const departmentStatQuery = useGetDepartmentStatQuery({
		departmentId: Number(managerId.id),
		start:
			new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
		end:
			new Date().toISOString().split("T")[0],
	});

	useEffect(() => {
		if (USER.role !== EUserRole.admin) window.location.href = '/'
	}, [])

	return (<>
		<div className={'department'}>
			{departmentInfoQuery.isSuccess
				? <motion.h2 className={'department--title'}
						initial={{opacity: 0}}
						animate={{opacity: 1}}
						transition={{delay: 0.1, duration: 0.5}}
				>{departmentInfoQuery.data.department}</motion.h2>
				: <>{departmentInfoQuery.isLoading
					? <motion.h2 className={'department--title'}
						initial={{opacity: 0}}
						animate={{opacity: 1}}
						transition={{delay: 0.1, duration: 0.5}}
					>Загрузка...</motion.h2>
					: <motion.h2 className={'department--title'}
						initial={{opacity: 0}}
						animate={{opacity: 1}}
						transition={{delay: 0.1, duration: 0.5}}
					>Не удалось загрузить</motion.h2>
				}</>
			}
			<div className={'department--content'}>
				<motion.p className={'department--content__title'}
					initial={{opacity: 0}}
					animate={{opacity: 1}}
					transition={{delay: 0.1, duration: 0.5}}
				>Статистика отдела
				</motion.p>
				<motion.div
					initial={{opacity: 0}}
					animate={{opacity: 1}}
					transition={{delay: 0.1, duration: 0.5}}
					style={{
						display: "flex",
						gap: "20px",
						flexWrap: "wrap",
						alignItems: "flex-start"
					}}
				>
					{departmentStatQuery.isSuccess
						? <>
							<Chart data={departmentStatQuery.data}/>
						</>
						: <>{departmentStatQuery.isLoading
							? <>Загрузка...</>
							: <>Не удалось загрузить данные</>
						}</>
					}
				</motion.div>
				<motion.p className={'department--content__title'}
				          initial={{opacity: 0}}
				          animate={{opacity: 1}}
				          transition={{delay: 0.1, duration: 0.5}}
				>Куратор отдела
				</motion.p>
				{curatorInfoQuery.isSuccess
					? <motion.p className={'statistic--path'}
					            initial={{opacity: 0}}
					            animate={{opacity: 1}}
					            transition={{delay: 0.1, duration: 0.5}}
					            style={{
						            width: "100px",
						            textAlign: "center"
					            }}
					>
						{curatorInfoQuery.data.fio}
					</motion.p>
					: <>{curatorInfoQuery.isLoading
						? <motion.p className={'statistic--path'}
						            initial={{opacity: 0}}
						            animate={{opacity: 1}}
						            transition={{delay: 0.1, duration: 0.5}}
						            style={{
							            width: "100px",
							            textAlign: "center"
						            }}
						>
							Загрузка...
						</motion.p>
						: <></>
					}</>
				}
				<motion.p className={'department--content__title'}
				          initial={{opacity: 0}}
				          animate={{opacity: 1}}
				          transition={{delay: 0.1, duration: 0.5}}
				>Глава отдела
				</motion.p>
				<div className={'department--cards'}>
					{employeesQuery.isSuccess
						? <>{employeesQuery.data.map((value) => <>{
							value.speciality === "Lead"
								? <LineInformationCard
									type={'employee'}
									name={value.fio}
									secondColumn={value.speciality}
									thirdColumn={`Вероятность ${value.rating}%`}
									id={value.id}
									initialY={10}
									link={`/application/employee/${value.id}`}
								/>
								: <></>
						}</>)}</>
						: <>{employeesQuery.isLoading
							? <>Загрузка</>
							: <>Ошибка загрузки</>
						}</>
					}
				</div>
				<motion.p className={'department--content__title'}
				          initial={{opacity: 0}}
				          animate={{opacity: 1}}
				          transition={{delay: 0.1, duration: 0.5}}
				>Сотрудники отдела
				</motion.p>
				<div className={'department--cards'}>
					{employeesQuery.isSuccess
						? <>{employeesQuery.data.map((value) =>
							<>
								{value.speciality === "Lead"
									? <></>
									: <LineInformationCard
										type={'employee'}
										name={value.fio}
										secondColumn={value.speciality}
										thirdColumn={`Вероятность ${value.rating}%`}
										id={value.id}
										initialY={10}
										link={`/application/employee/${value.id}`}
									/>
								}
							</>
						)}</>
						: <>Не загрузило(</>
					}
				</div>
			</div>
		</div>
	</>)
}