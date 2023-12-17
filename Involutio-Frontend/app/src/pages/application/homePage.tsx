import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"
import { useAppSelector } from "../../hooks/redux.ts";
import { EUserRole } from "../../models/EUserRole.ts";

export default function HomePage() {
	const navigator = useNavigate()

	const USER = useAppSelector((state) => state.user)

	return <div className={'home'}>
		<motion.h2 className={'home--title'}
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.1, duration: 0.5 }}
		>Привет, {USER.fio}👋</motion.h2>
		<div className={'home--content'}>
			{USER.role === EUserRole.manager
				? <>
					<div className={'statistic'} style={{
						maxWidth: "100%",
						marginBottom: "0"
					}}>
						<motion.p
							className={'statistic--button'}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.1, duration: 0.5 }}
							onClick={() => navigator('/application/employees')}
						>Посмотреть своих сотрудников</motion.p>
						<motion.p
							className={'statistic--button'}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.1, duration: 0.5 }}
							onClick={() => navigator('/application/reports')}
						>Посмотреть отчёты отдела</motion.p>
					</div>
				</>
				: <>{USER.role === EUserRole.admin
					? <>
						<div className={'statistic'} style={{
							maxWidth: "100%",
							marginBottom: "0"
						}}>
							<motion.p
								className={'statistic--button'}
								initial={{opacity: 0}}
								animate={{opacity: 1}}
								transition={{delay: 0.1, duration: 0.5}}
								onClick={() => navigator('/application/departments')}
							>Посмотреть список отделов</motion.p>
							<motion.p
								className={'statistic--button'}
								initial={{opacity: 0}}
								animate={{opacity: 1}}
								transition={{delay: 0.1, duration: 0.5}}
								onClick={() => navigator('/application/employees')}
							>Посмотреть сотрудников подразделений</motion.p>
							<motion.p
								className={'statistic--button'}
								initial={{opacity: 0}}
								animate={{opacity: 1}}
								transition={{delay: 0.1, duration: 0.5}}
								onClick={() => navigator('/application/reports')}
							>Посмотреть отчёты по подразделениям</motion.p>
						</div>
					</>
					: <></>
				}</>
			}
		</div>
	</div>
}