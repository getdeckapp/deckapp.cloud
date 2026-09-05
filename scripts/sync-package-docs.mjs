import fs from 'node:fs';
import path from 'node:path';

// [slug, sidebar/H1 title, SEO overrides]
//
// `title` drives the H1 and sidebar label and must stay short. When `seo` is
// set, its `title` replaces the `<title>` tag (and og:title) only, and its
// `description` becomes the meta description — page content is untouched.
const PACKAGE_DOCS = [
	[
		'getting-started',
		'Getting Started',
		{
			title: 'Install Deck — Laravel Queue Monitoring Setup Guide',
			description:
				'Install the Deck package to add Laravel queue monitoring on any queue driver, with or without Horizon: requirements, composer install, migrations, authorization, and project identity.',
		},
	],
	['horizon', 'Horizon & Deck'],
	[
		'usage',
		'Usage',
		{
			title: 'Laravel Queue Dashboard Usage — Search, Cancel, Block Jobs',
			description:
				'How to use the Deck Laravel queue dashboard: search job execution history, cancel running jobs cooperatively, block job classes, retry failures, and set up stale-job alerts.',
		},
	],
	['production', 'Production'],
	['configuration', 'Configuration'],
];

const BASE_URL =
	'https://raw.githubusercontent.com/getdeckapp/deck/master/docs';
const OUT_DIR = path.join(process.cwd(), 'src/content/docs/package');

// JSON strings are valid YAML scalars, so this safely quotes colons, dashes, etc.
const yaml = (value) => JSON.stringify(value);

function buildFrontmatter(title, seo) {
	const lines = ['---', `title: ${title}`];

	if (seo) {
		lines.push(
			`description: ${yaml(seo.description)}`,
			'head:',
			'  - tag: title',
			`    content: ${yaml(seo.title)}`,
			'  - tag: meta',
			'    attrs:',
			'      property: og:title',
			`      content: ${yaml(seo.title)}`,
		);
	} else {
		lines.push(
			`description: Deck package documentation — ${title.toLowerCase()}.`,
		);
	}

	lines.push('---', '', '');

	return lines.join('\n');
}

function rewriteLinks(content) {
	return content
		.replace(/\]\((\w[\w-]*)\.md(#[\w-]+)?\)/g, (_, slug, anchor) => {
			if (slug === 'deck-cloud') {
				return `](/cloud/introduction/${anchor ?? ''})`;
			}

			return `](/package/${slug}/${anchor ?? ''})`;
		})
		.replace(
			/^## Deck Cloud \(optional\)\n\n```env\nDECK_API_KEY=your-agent-token\n```\n\nSee \[Deck Cloud\]\([^)]+\)\. Overview: \[deckapp\.cloud\]\([^)]+\)\.\n\n/m,
			'',
		)
		.replace(
			/^## Next steps\n\n(?:- \[[^\n]+\n)+/m,
			`## Next steps

- [Usage](/package/usage/) — dashboard, cancel, block, retry
- [Production](/package/production/) — retention, Redis, security
- [Configuration](/package/configuration/) — environment variables

Using Deck Cloud? See the [Cloud docs](/cloud/introduction/).

`,
		);
}

async function sync() {
	fs.mkdirSync(OUT_DIR, { recursive: true });

	for (const [slug, title, seo] of PACKAGE_DOCS) {
		const response = await fetch(`${BASE_URL}/${slug}.md`);

		if (!response.ok) {
			throw new Error(`Failed to fetch ${slug}.md (${response.status})`);
		}

		let body = rewriteLinks(await response.text());
		body = body.replace(/^# .+\n\n/, '');

		const frontmatter = buildFrontmatter(title, seo);

		fs.writeFileSync(
			path.join(OUT_DIR, `${slug}.md`),
			`${frontmatter}${body.trim()}\n`,
		);

		console.log(`Synced package/${slug}.md`);
	}
}

await sync();
