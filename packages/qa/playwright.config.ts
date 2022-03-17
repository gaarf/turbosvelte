import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	use: {
		browserName: 'chromium'
	},
	testDir: 'e2e/',
	webServer: {
		cwd: '../web',
		port: 3000,
		command: 'yarn run build && yarn run preview'
	}
};

export default config;
