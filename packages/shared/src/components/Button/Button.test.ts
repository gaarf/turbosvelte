/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/svelte';
import Button from './Button.svelte';

describe('Button', () => {
	it('can be an icon', () => {
		const { getByLabelText } = render(Button, { icon: 'close' });
		const el = getByLabelText('close');
		expect(el).toBeInTheDocument();
		expect(el).toBeEnabled();
	});

	it('can be disabled', () => {
		const { getByRole } = render(Button, { disabled: true });
		expect(getByRole('button')).toBeDisabled();
	});

	xit('can take a slot', () => {
		// see https://github.com/sveltejs/svelte/pull/5687
		const { getByText } = render(Button, { $$slots: { default: 'Hello World' } });
		const el = getByText('Hello World');
		expect(el).toBeInTheDocument();
		expect(el).toBeEnabled();
	});
});
