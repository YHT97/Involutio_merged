import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { motion } from "framer-motion";
import {
	useGetDepartmentInfoQuery,
	useGetEmployeeInfoQuery,
	useGetEmployeeStatQuery
} from "../../services/dataService";
import {
	setFio,
	setId,
	setMail,
	setManagerId,
	setRating, setRegressions,
	setSpeciality
} from "../../store/reducers/IEmployeeSlice.ts";

import { EUserRole } from "../../models/EUserRole";

import Chart from "../../components/chart";

export default function EmployeePage() {
	const employeeId = useParams();
	const dispatch = useAppDispatch();
	const navigator = useNavigate()

	const USER = useAppSelector((state) => state.user);
	const EMPLOYEE = useAppSelector((state) => state.employee)

	const employeeQuery = useGetEmployeeInfoQuery(Number(employeeId.id));

	useEffect(() => {
		if (employeeQuery.isSuccess) {
			dispatch(setId(employeeQuery.data.id))
			dispatch(setFio(employeeQuery.data.fio))
			dispatch(setMail(employeeQuery.data.mail))
			dispatch(setManagerId(employeeQuery.data.managerId))
			dispatch(setRating(employeeQuery.data.rating))
			dispatch(setSpeciality(employeeQuery.data.speciality))
			dispatch(setRegressions({
				regressionB: employeeQuery.data.regression_b,
				regressionK: employeeQuery.data.regression_k
			}))
		} else {
			dispatch(setId(-1))
			dispatch(setFio("nothing"))
			dispatch(setMail("nothing"))
			dispatch(setManagerId(-1))
			dispatch(setRating(-1))
			dispatch(setSpeciality("nothing"))
		}
	}, [employeeQuery])

	const MANAGER = useGetDepartmentInfoQuery(USER.role === EUserRole.manager ? USER.id : EMPLOYEE.managerId);
	const STAT = useGetEmployeeStatQuery({
		workerId: Number(employeeId.id),
		start:
			new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
		end:
			new Date().toISOString().split("T")[0],
	});

	return (<>
		<div className={'employee'}>
			{employeeQuery.isSuccess
				? <motion.h2 className={'employee--title'}
				             initial={{opacity: 0}}
				             animate={{opacity: 1}}
				             transition={{delay: 0.1, duration: 0.5}}
				>{EMPLOYEE.fio}</motion.h2>
				: <>{employeeQuery.isLoading
					? <motion.h2 className={'employee--title'}
					             initial={{opacity: 0}}
					             animate={{opacity: 1}}
					             transition={{delay: 0.1, duration: 0.5}}
					>Загрузка...</motion.h2>
					: <motion.h2 className={'employee--title'}
					             initial={{opacity: 0}}
					             animate={{opacity: 1}}
					             transition={{delay: 0.1, duration: 0.5}}
					>Ошибка(</motion.h2>
				}</>
			}
			<div className={'employee--content'}>
				<div className={'statistic'}>
					{USER.role === EUserRole.admin
						? <motion.p className={'statistic--button'}
							initial={{opacity: 0, y: 10}}
							animate={{opacity: 1, y: 0}}
							transition={{duration: 0.5}}
						    onClick={() => {MANAGER.isSuccess
							    ? navigator(`/application/department/${MANAGER.data.id}`)
							    : {}
						    }}
						>
							{MANAGER?.isSuccess
								? <>{MANAGER.data.department}</>
								: <>{ MANAGER?.isLoading
									? <>Загрузка...</>
									: <>Не удалось загрузить</>
								}</>
							}
						</motion.p>
						: <>{MANAGER?.isSuccess
							? <motion.p className={'statistic--path'}
							            initial={{opacity: 0, y: 10}}
							            animate={{opacity: 1, y: 0}}
							            transition={{duration: 0.5}}
							>{MANAGER.data.department}</motion.p>
							: <>{MANAGER?.isLoading
								? <motion.p className={'statistic--path'}
								            initial={{opacity: 0, y: 10}}
								            animate={{opacity: 1, y: 0}}
								            transition={{duration: 0.5}}
								>Загрузка</motion.p>
								: <motion.p className={'statistic--path'}
								            initial={{opacity: 0, y: 10}}
								            animate={{opacity: 1, y: 0}}
								            transition={{duration: 0.5}}
								>Ошибка</motion.p>
							}</>
						}</>
					}
					{employeeQuery.isSuccess
						? <motion.p className={'statistic--path'}
						            initial={{opacity: 0, y: 10}}
						            animate={{opacity: 1, y: 0}}
						            transition={{duration: 0.5}}
						>{EMPLOYEE.speciality}</motion.p>
						: <>{employeeQuery.isLoading
							? <motion.p className={'statistic--path'}
							            initial={{opacity: 0, y: 10}}
							            animate={{opacity: 1, y: 0}}
							            transition={{duration: 0.5}}
							>Загрузка</motion.p>
							: <motion.p className={'statistic--path'}
							            initial={{opacity: 0, y: 10}}
							            animate={{opacity: 1, y: 0}}
							            transition={{duration: 0.5}}
							>Ошибка</motion.p>
						}</>
					}
					{employeeQuery.isSuccess
						? <motion.p className={'statistic--path'}
						            initial={{opacity: 0, y: 10}}
						            animate={{opacity: 1, y: 0}}
						            transition={{duration: 0.5}}
						>Адрес электронной почты: <strong>{EMPLOYEE.mail}</strong></motion.p>
						: <>{employeeQuery.isLoading
							? <motion.p className={'statistic--path'}
							            initial={{opacity: 0, y: 10}}
							            animate={{opacity: 1, y: 0}}
							            transition={{duration: 0.5}}
							>Загрузка</motion.p>
							: <motion.p className={'statistic--path'}
							            initial={{opacity: 0, y: 10}}
							            animate={{opacity: 1, y: 0}}
							            transition={{duration: 0.5}}
							>Ошибка</motion.p>
						}</>
					}
					{employeeQuery.isSuccess
						? <motion.p className={'statistic--path'}
						            initial={{opacity: 0, y: 10}}
						            animate={{opacity: 1, y: 0}}
						            transition={{duration: 0.5}}
						>Вероятность увольнения на данный момент равна {EMPLOYEE.rating}%</motion.p>
						: <>{employeeQuery.isLoading
							? <motion.p className={'statistic--path'}
							            initial={{opacity: 0, y: 10}}
							            animate={{opacity: 1, y: 0}}
							            transition={{duration: 0.5}}
							>Загрузка</motion.p>
							: <motion.p className={'statistic--path'}
							            initial={{opacity: 0, y: 10}}
							            animate={{opacity: 1, y: 0}}
							            transition={{duration: 0.5}}
							>Ошибка</motion.p>
						}</>
					}
					{employeeQuery.isSuccess
						? <motion.p className={'statistic--path'}
						            initial={{opacity: 0, y: 10}}
						            animate={{opacity: 1, y: 0}}
						            transition={{duration: 0.5}}
						>{EMPLOYEE.regression_k < 0
							? <>Тенденция заинтерисованности сотрудника <strong>положительна</strong></>
							: <>{EMPLOYEE.regression_k > 0
								? <>Тенденция заинтерисованности сотрудника <strong>отрицательна</strong></>
								: <>Никаких изменений не наблюдается</>
							}</>
						}</motion.p>
						: <>{employeeQuery.isLoading
							? <motion.p className={'statistic--path'}
							            initial={{opacity: 0, y: 10}}
							            animate={{opacity: 1, y: 0}}
							            transition={{duration: 0.5}}
							>Загрузка</motion.p>
							: <motion.p className={'statistic--path'}
							            initial={{opacity: 0, y: 10}}
							            animate={{opacity: 1, y: 0}}
							            transition={{duration: 0.5}}
							>Ошибка</motion.p>
						}</>
					}
				</div>
				<div className={'employee--content__graph'}>
					{STAT.isSuccess
						? <Chart data={STAT.data}/>
						: <>{STAT.isLoading
							? <>Загрузка...</>
							: <>Ошибка</>
						}</>
					}
				</div>
			</div>
		</div>
	</>)
}