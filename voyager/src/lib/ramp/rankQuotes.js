/**
 * Stand-in for the spec's §7.4 ranking rubric. The real implementation will query
 * `kind:38383` events from Nostr relays; this module is a deterministic client-side
 * approximation that lets us visualize the flow without a live network.
 *
 * @typedef {Object} MostroNode
 * @property {string} name
 * @property {string} region
 * @property {string[]} supportedFiats
 * @property {string[]} supportedMethods
 * @property {number} feePct
 * @property {number} reputation       // 0..100
 * @property {number} hodlLiquiditySats
 *
 * @typedef {Object} RankInput
 * @property {number} amountSats
 * @property {string} fiat             // 'JMD' | 'USD' | 'EUR' | 'GBP'
 * @property {string} method           // 'bank' | 'wise' | 'cash' | 'mobile'
 *
 * @typedef {Object} RankedQuote
 * @property {MostroNode} node
 * @property {number} score                                  // 0..1, higher is better
 * @property {number} effectiveRateSatsPerFiat              // base rate * (1 - feePct/100)
 * @property {number} feeSats                                // fee portion of amountSats
 */

// Stable reference rate table (sats per 1 unit of fiat). Real nodes will publish
// live rates; the fixture approximates the spec's Caribbean-tuned corridor.
const RATE_TABLE = {
	USD: 1842,
	EUR: 2010,
	GBP: 2340,
	JMD: 12
};

/**
 * @param {MostroNode[]} nodes
 * @param {RankInput} input
 * @returns {RankedQuote[]}
 */
export function rankQuotes(nodes, { amountSats, fiat, method }) {
	const baseRate = RATE_TABLE[fiat];
	if (!baseRate) return [];

	const candidates = nodes.filter(
		(n) => n.supportedFiats.includes(fiat) && n.supportedMethods.includes(method)
	);
	if (candidates.length === 0) return [];

	const fees = candidates.map((n) => n.feePct);
	const minFee = Math.min(...fees);
	const maxFee = Math.max(...fees);
	const feeSpan = Math.max(maxFee - minFee, 0.0001);

	const scored = candidates.map((node) => {
		const effectiveRate = baseRate * (1 - node.feePct / 100);
		// Lower fee -> higher feeScore. Single-candidate sets still get a perfect 1.
		const feeScore = 1 - (node.feePct - minFee) / feeSpan;
		const reputationScore = node.reputation / 100;
		// rateScore is approximated by reputation for now; real impl uses live rate spreads.
		const rateScore = reputationScore;
		const score = 0.6 * rateScore + 0.2 * feeScore + 0.2 * reputationScore;
		const feeSats = Math.round((amountSats * node.feePct) / 100);
		return { node, score, effectiveRateSatsPerFiat: effectiveRate, feeSats };
	});

	scored.sort((a, b) => b.score - a.score);
	return scored.slice(0, 3);
}