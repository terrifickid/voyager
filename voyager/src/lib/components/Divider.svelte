<script>
	/** @type {{ tone?: 'ink' | 'bone' }} */
	let { tone = 'ink' } = $props();
</script>

<span
	class="block w-full border-t border-dotted {tone === 'bone' ? 'border-bone-50/30' : 'border-ink/20'}"
	aria-hidden="true"
></span>
