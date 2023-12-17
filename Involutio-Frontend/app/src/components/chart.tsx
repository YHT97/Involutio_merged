import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { motion } from "framer-motion";
import { IStatistic } from "../models/IStatistic.ts";

export default function Chart(props : { data: IStatistic[] }) {

	return (
		<motion.div className={'employee-chart'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
		>
			<p className={'employee-chart--title'}>Динамика вероятности увольнения за последнюю неделю</p>
			<ResponsiveContainer width={800} height={300}>
				<LineChart data={props.data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
					<XAxis dataKey="date" stroke={"#FFFFFF"} tickLine={false} axisLine={false} width={100}/>
					<YAxis stroke={"#FFFFFF"} tickLine={false} axisLine={false} height={100}/>
					<Tooltip />
					<Line dataKey="rating" fill="none" stroke={"#FFFFFF"} dot={false}/>
				</LineChart>
			</ResponsiveContainer>
		</motion.div>
	);
}