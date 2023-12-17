import { useState } from "react";
import { motion } from "framer-motion";

interface DropdownMenuProps {
	options?: { value: string; label: string }[];
	onSelectOption: (selectedValue: string) => void;
	defaultSelected: string
}

export default function DropdownMenu(props : DropdownMenuProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState(props.defaultSelected);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const handleOptionClick = (option: { value: string; label: string }) => {
		setSelectedOption(option.value);
		props.onSelectOption(option.value);
		setIsOpen(false);
	};
	return <motion.div className={'dropdown'}
		initial={{opacity: 0}}
		animate={{opacity: 1}}
		transition={{duration: 0.5}}
	>
		<div className={'dropdown--heading'} onClick={toggleMenu}>
			{selectedOption || 'Выберите отдел'}
			{isOpen ? <div className={'dropdown--heading__up'}/> : <div className={'dropdown--heading__down'}/>}
		</div>
		{isOpen && (
			<ul className={'dropdown--list'}>
				{props.options?.map((option) => (
					<li className={'dropdown--list__item'} key={option.value} onClick={() => handleOptionClick(option)}>
						{option.label}
					</li>
				))}
			</ul>
		)}
	</motion.div>
}