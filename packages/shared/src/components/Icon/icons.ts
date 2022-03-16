import { faFlag, faUser } from '@fortawesome/free-solid-svg-icons';

const iconDefs = {
	flag: faFlag,
	user: faUser
};

export type IconName = keyof typeof iconDefs;

export default iconDefs;
