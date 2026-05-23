import fs from 'node:fs';
import path from 'node:path';

const PACKAGE_DOCS = [
	['getting-started', 'Getting Started'],
	['horizon', 'Horizon & Deck'],
	['usage', 'Usage'],
	['production', 'Production'],
	['configuration', 'Configuration'],
];

const BASE_URL =
	'https://raw.githubusercontent.com/getdeckapp/deck/master/docs';
const OUT_DIR = path.join(process.cwd(), 'src/content/docs/package');

const titles = Object.fromEntries(PACKAGE_DOCS);

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

	for (const [slug, title] of PACKAGE_DOCS) {
		const response = await fetch(`${BASE_URL}/${slug}.md`);

		if (!response.ok) {
			throw new Error(`Failed to fetch ${slug}.md (${response.status})`);
		}

		let body = rewriteLinks(await response.text());
		body = body.replace(/^# .+\n\n/, '');

		const frontmatter = `---
title: ${title}
description: Deck package documentation — ${title.toLowerCase()}.
---

`;

		fs.writeFileSync(
			path.join(OUT_DIR, `${slug}.md`),
			`${frontmatter}${body.trim()}\n`,
		);

		console.log(`Synced package/${slug}.md`);
	}
}

await sync();
