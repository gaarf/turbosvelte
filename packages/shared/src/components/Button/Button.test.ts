/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/svelte';
import Button from './Button.svelte';

describe('Button', () => {
	it('has a slot fallback', () => {
		const { getByText } = render(Button);
		const el = getByText('Click Me');
		expect(el).toBeInTheDocument();
		expect(el).toBeEnabled();
	});

	it('can be disabled', () => {
		const { getByRole } = render(Button, { disabled: true });
		expect(getByRole('button')).toBeDisabled();
	});
});
