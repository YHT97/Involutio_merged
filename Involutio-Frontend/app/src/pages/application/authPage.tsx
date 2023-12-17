import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/redux.ts";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useGetUserQuery, useSignInMutation } from "../../services/authService.ts";
import { setId, setLogin, setName, setRole } from "../../store/reducers/IUserSlice.ts";
import { EUserRole } from "../../models/EUserRole.ts";

import grad from "../../assets/gradient.svg";

export default function AuthPage() {
	const dispatch = useAppDispatch()
	const navigator = useNavigate()

	//@ts-ignore
	const [userLogin, setUserLogin] = useState<string>('')
	//@ts-ignore
	const [userPassword, setUserPassword] = useState<string>('')
	const [signIn,
		{
			isSuccess,
			data,
			isLoading,
			isError,
			error
		}] = useSignInMutation()
	const getUser = useGetUserQuery('')

	const authHandler = () => {
		signIn({
			login: userLogin,
			password: userPassword,
		})
	}

	useEffect(() => {
		if (getUser.isSuccess) {
			dispatch(setName(getUser.data.login))
			if (getUser.data.role === 'MANAGER') {
				dispatch(setRole(EUserRole.manager))
				navigator('/application')
			}
			if (getUser.data.role === 'ADMIN') {
				dispatch(setRole(EUserRole.admin))
				navigator('/application')
			}
		}
	}, [getUser]);

	useEffect(() => {
		if (isSuccess) {
			dispatch(setLogin(userLogin))
			//@ts-ignore
			dispatch(setName(data.fio))
			//@ts-ignore
			dispatch(setId(data.id))
			//@ts-ignore
			if (data.role === EUserRole.manager) {
				dispatch(setRole(EUserRole.manager))
				navigator('/application')
			}
			//@ts-ignore
			if (data.role === EUserRole.admin) {
				dispatch(setRole(EUserRole.admin))
				navigator('/application')
			}
			else {
				dispatch(setRole(EUserRole.non))
			}
		}
		else if (isLoading) {
			console.log('Loading...')
		}
		else if (isError) {
			console.log("Error!", error)
		}
	}, [isSuccess])

	return <main>
		<section className={'auth'}>
			<div className={'auth--container'}>
				<motion.img className={'gradient'} src={grad} alt=""
		            initial={{ opacity: 0, scale: 0.5 }}
		            animate={{ opacity: 1, scale: 1 }}
		            transition={{ duration: 0.5 }}
				/>
				<motion.form className={'form'}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2, duration: 0.5 }}
				>
					<h2 className={'form--title'}>Sign In</h2>
					<div className={'form--inputs'}>
						<input className={'form--inputs__login'}
						       type="text"
						       placeholder={'login'}
						       onChange={(event) => setUserLogin(event.target.value)}
						/>
						<input className={'form--inputs__password'}
						       type="password"
						       placeholder={'password'}
						       onChange={(event) => setUserPassword(event.target.value)}
						/>
					</div>
					<button className={'form--sign'} type={'button'}  onClick={authHandler}>sign_in</button>
				</motion.form>
				<p className={'auth--container__omnia'}>BY OMNIA</p>
			</div>
		</section>
	</main>
}