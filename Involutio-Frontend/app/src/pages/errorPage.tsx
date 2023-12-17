import { motion } from "framer-motion";

import grad from "../assets/gradient.svg";

export default function ErrorPage() {
	return <main>
		<motion.img className={'gradient'} src={grad} alt=""
		            initial={{opacity: 0, scale: 0.5}}
		            animate={{opacity: 1, scale: 1}}
		            transition={{delay: 0.2, duration: 0.5}}
		/>
		<section className={'error'}>
			<div className={'error--container'}>
				<h1 className={'error--container__code'}>404</h1>
				<p className={'error--container__description'}>Страница не найдена</p>
			</div>
		</section>
	</main>
}