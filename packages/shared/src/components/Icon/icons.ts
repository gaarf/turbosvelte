import { faFlag, faUser, faClose } from '@fortawesome/free-solid-svg-icons';

const iconDefs = {
	close: faClose,
	flag: faFlag,
	user: faUser
};

export type IconName = keyof typeof iconDefs;

export default iconDefs;
