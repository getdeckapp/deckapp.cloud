// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';
import {
	deckCustomizeTheme,
	deckCodeStyleOverrides,
	deckShikiOptions,
} from './src/themes/deck-code-theme.mjs';

// https://astro.build/config
export default defineConfig({
	site: 'https://deckapp.cloud',
	vite: {
		plugins: [tailwindcss()],
	},
	integrations: [
		starlight({
			title: 'Deck',
			description:
				'Job-class observability and cooperative cancellation for Laravel apps running Horizon.',
			logo: {
				src: './src/assets/logo.svg',
				alt: 'Deck',
				replacesTitle: true,
			},
			components: {
				Header: './src/components/DocsHeader.astro',
				SiteTitle: './src/components/DocsSiteTitle.astro',
			},
			expressiveCode: {
				themes: ['vitesse-dark', 'vitesse-light'],
				defaultTheme: 'vitesse-dark',
				useStarlightDarkModeSwitch: true,
				shiki: deckShikiOptions,
				customizeTheme: deckCustomizeTheme,
				styleOverrides: deckCodeStyleOverrides,
			},
			editLink: {
				baseUrl: 'https://github.com/getdeckapp/deckapp.cloud/edit/main/',
			},
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/getdeckapp/deck',
				},
			],
			customCss: ['./src/styles/custom.css'],
			head: [
				{
					tag: 'script',
					attrs: {
						src: 'https://www.glancelytics.com/js/cmpgx0xf3000ll804jg2oq0y9',
						'data-domain': 'deckapp.cloud',
						defer: true,
					},
				},
			],
			sidebar: [
				{ label: '← deckapp.cloud', link: '/' },
				{ label: 'Overview', slug: 'overview' },
				{
					label: 'Package',
					items: [{ autogenerate: { directory: 'package' } }],
				},
				{
					label: 'Deck Cloud',
					items: [{ autogenerate: { directory: 'cloud' } }],
				},
			],
		}),
	],
});
