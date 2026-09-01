export const clamp = (v, lo = -1, hi = 1) => Math.max(lo, Math.min(hi, v));

export function computePersonality(form, { archetypeOptions: archOpts, tagOptions, scoringTraits: traits }) {
	const out = {};
	const archOpt = archOpts.find((o) => o.id === form.archetype);
	const selected = tagOptions.filter((o) => form.tags.includes(o.id));
	for (const { key } of traits) {
		const parts = [];
		if (archOpt?.traits[key]) parts.push(archOpt.traits[key]);
		for (const o of selected) if (o.traits[key]) parts.push(o.traits[key]);
		out[key] = parts.length ? clamp(parts.reduce((a, b) => a + b, 0) / parts.length) : 0;
	}
	return out;
}

export function nearestType(personality, archetypeOptions, scoringTraits) {
	let best = null;
	let bestD = Infinity;
	for (const opt of archetypeOptions) {
		let d = 0;
		for (const { key } of scoringTraits) {
			const dv = (personality[key] || 0) - (opt.traits[key] || 0);
			d += dv * dv;
		}
		if (d < bestD) {
			bestD = d;
			best = opt;
		}
	}
	return best;
}
