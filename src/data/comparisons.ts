// Single source of truth for the comparison pages. Drives the header
// dropdown, the footer column, and the "more comparisons" block.
export interface Comparison {
	slug: string;
	name: string;
	label: string;
	blurb: string;
}

export const comparisons: Comparison[] = [
	{
		slug: 'vs-horizon',
		name: 'Laravel Horizon',
		label: 'Deck vs Horizon',
		blurb: 'Keep Horizon. Add the memory it doesn’t have.',
	},
	{
		slug: 'vs-pulse',
		name: 'Laravel Pulse',
		label: 'Deck vs Pulse',
		blurb: 'Aggregate vital signs, or a record of every job.',
	},
	{
		slug: 'vs-nightwatch',
		name: 'Laravel Nightwatch',
		label: 'Deck vs Nightwatch',
		blurb: 'Hosted whole-app monitoring, or queue depth and controls.',
	},
	{
		slug: 'vs-vigilance',
		name: 'Vigilance',
		label: 'Deck vs Vigilance',
		blurb: 'Self-hosted all-in-one APM, or deep on queues.',
	},
	{
		slug: 'vs-skyline',
		name: 'Skyline',
		label: 'Deck vs Skyline',
		blurb: 'A record of what happened, or controls for right now.',
	},
];

// Each table cell is `true` (✓), `false` (–) or a short note when neither is honest.
export type Cell = boolean | string;
export type Row = [group: string, label: string, deck: Cell, other: Cell];
