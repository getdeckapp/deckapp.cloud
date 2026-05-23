/** @typedef {import('astro-expressive-code').ExpressiveCodeTheme} ExpressiveCodeTheme */

const DECK_CODE_BG = '#09090b';
const DECK_CODE_BORDER = '#27272a';

/** Token remaps for dark themes — nudge greens toward Deck indigo. */
const DARK_TOKEN_REMAP = {
	'#4d9375': '#818cf8',
	'#80a665': '#a5b4fc',
	'#5d99a9': '#67e8f9',
	'#6872ab': '#c4b5fd',
};

/**
 * @param {ExpressiveCodeTheme} theme
 * @returns {ExpressiveCodeTheme}
 */
export function deckCustomizeTheme(theme) {
	theme.bg = theme.type === 'dark' ? DECK_CODE_BG : '#fafafa';
	theme.colors['editor.background'] = theme.bg;

	if (theme.type === 'dark') {
		theme.colors['editor.foreground'] = '#d4d4d8';
		theme.settings?.forEach((rule) => {
			const fg = rule.settings?.foreground;
			if (typeof fg === 'string' && fg in DARK_TOKEN_REMAP) {
				rule.settings.foreground = DARK_TOKEN_REMAP[fg];
			}
		});
	}

	return theme;
}

export const deckCodeStyleOverrides = {
	borderRadius: '0.75rem',
	borderColor: DECK_CODE_BORDER,
	borderWidth: '1px',
	codeFontSize: '0.8125rem',
	codeLineHeight: '1.75',
	codeFontFamily: 'var(--__sl-font-mono)',
	frames: {
		editorBackground: DECK_CODE_BG,
		terminalBackground: DECK_CODE_BG,
		editorActiveTabBackground: DECK_CODE_BG,
		frameBoxShadowCssValue: '0 1px 2px rgba(15, 23, 42, 0.12)',
		editorTabBarBackground: '#18181b',
		editorTabBarBorderBottomColor: DECK_CODE_BORDER,
	},
};

export const deckShikiOptions = {
	langAlias: {
		env: 'dotenv',
	},
	bundledLangs: [
		'php',
		'bash',
		'shellscript',
		'dotenv',
		'json',
		'yaml',
		'ini',
		'sql',
		'text',
		'markdown',
		'xml',
		'html',
	],
};
