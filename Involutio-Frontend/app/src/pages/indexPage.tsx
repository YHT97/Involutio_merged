import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import grad from '../assets/gradient.svg'

export default function IndexPage() {
	return <main>
		<motion.img className={'gradient'} src={grad} alt=""
		            initial={{opacity: 0, scale: 0.5}}
		            animate={{opacity: 1, scale: 1}}
		            transition={{duration: 0.5}}
		/>
		<section className={'hero'}>
			<div className={'hero--container'}>
				<div className={'heading'}>
					<motion.h1 className={'heading--title'}
					           initial={{opacity: 0}}
					           animate={{opacity: 1}}
					           transition={{duration: 0.5}}
					>
						{"Involutio".split('').map((value, index) =>
							<motion.span
								initial={{opacity: 0}}
								animate={{opacity: 1}}
								transition={{delay: 0.2 + index / 10}}
								key={index}
							>{value}</motion.span>
						)}
					</motion.h1>
					<motion.p className={'heading--description'}
					          initial={{opacity: 0}}
					          animate={{opacity: 1}}
					          transition={{delay: 1, duration: 0.5}}
					>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit,
						sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
					</motion.p>
				</div>
				<motion.div
					initial={{opacity: 0}}
					animate={{opacity: 1}}
					transition={{delay: 1.2, duration: 0.5}}
				>
					<Link className={'hero--container__button'} to={'/auth'}>Try It</Link>
				</motion.div>
				<motion.p className={'hero--container__omnia'}
				          initial={{opacity: 0}}
				          animate={{opacity: 1}}
				          transition={{delay: 1.4, duration: 0.5}}
				>BY OMNIA
				</motion.p>
			</div>
		</section>
	</main>
}