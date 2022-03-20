import { faFlag, faUser, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

const iconDefs = {
	close: faCircleXmark,
	flag: faFlag,
	user: faUser
};

export type IconName = keyof typeof iconDefs;

export default iconDefs;
