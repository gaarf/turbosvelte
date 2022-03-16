import { faFlag } from '@fortawesome/free-solid-svg-icons';

const iconDefs = {
	flag: faFlag
};

export type IconName = keyof typeof iconDefs;

export default iconDefs;
