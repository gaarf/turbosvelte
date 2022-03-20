import { faFlag, faUser, faTimes } from '@fortawesome/free-solid-svg-icons';

const iconDefs = {
	close: faTimes,
	flag: faFlag,
	user: faUser
};

export type IconName = keyof typeof iconDefs;

export default iconDefs;
