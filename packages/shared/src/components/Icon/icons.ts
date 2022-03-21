import { faFlag } from '@fortawesome/free-solid-svg-icons/faFlag';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';

const iconDefs = {
	close: faTimes,
	flag: faFlag,
	user: faUser
};

export type IconName = keyof typeof iconDefs;

export default iconDefs;
