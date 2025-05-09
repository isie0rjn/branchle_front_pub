import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			fallback: 'index.html' // Используем index.html для всех маршрутов (SPA)
		}),
		prerender: {
			entries: [] // Отключаем автоматический пререндеринг
		}
	}
};

export default config;
