import App from './App.svelte';
import './app.css';
import { setDarkDocument } from '$components/DarkToggle';

setDarkDocument();

const app = new App({
	target: document.body
});

export default app;
