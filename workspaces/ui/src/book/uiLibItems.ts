import type { LibraryItem } from './types';
import { mkItem } from './types';

import { Button, SeedGenerator } from '../components/index';

const items: LibraryItem[] = [
	mkItem(Button, {
		default: {
			slot: 'Here be a Button'
		},
		small: {
			props: { small: true }
		},
		disabled: {
			props: { disabled: true }
		}
	}),

	mkItem(SeedGenerator)
];

export default items;
