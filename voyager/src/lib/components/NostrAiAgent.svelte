<script>
	import NostrAiSearch from './NostrAiSearch.svelte';
	import NostrAiWrite from './NostrAiWrite.svelte';
	import NostrAiEmbed from './NostrAiEmbed.svelte';

	/**
	 * @typedef {'perk' | 'rasta' | 'carnival-poster' | 'carnival-poster-white' | 'ocean' | 'windies' | 'gold-cream' | 'caribana' | 'heritage-sepia' | 'editorial' | 'civic-ocean' | 'festival-poster' | 'monochrome-caribbean' | 'trinidad' | 'orange-sun' | 'tiffany' | 'maroon-nights'} Register
	 * @typedef {'search' | 'write' | 'embed'} Tab
	 */
	/** @type {{ register?: Register, defaultTab?: Tab, showTabs?: boolean }} */
	let {
		register = 'carnival-poster',
		defaultTab = 'search',
		showTabs = true
	} = $props();

	let active = $state(defaultTab);
	let activeRelay = $state('');

	function selectTab(t) {
		active = t;
	}

	function handleKey(e, tabs) {
		const idx = tabs.indexOf(active);
		if (idx < 0) return;
		if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
			e.preventDefault();
			active = tabs[(idx + 1) % tabs.length];
		} else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
			e.preventDefault();
			active = tabs[(idx - 1 + tabs.length) % tabs.length];
		} else if (e.key === 'Home') {
			e.preventDefault();
			active = tabs[0];
		} else if (e.key === 'End') {
			e.preventDefault();
			active = tabs[tabs.length - 1];
		}
	}

	const tabs = /** @type {Tab[]} */ (['search', 'write', 'embed']);
</script>

<div class="agent-shell" data-register={register}>
	<div class="topbar">
		{#if showTabs}
			<div class="tabs" role="tablist" aria-label="Nostr AI modes">
				<button
					type="button"
					role="tab"
					id="tab-search"
					aria-selected={active === 'search'}
					aria-controls="panel-search"
					tabindex={active === 'search' ? 0 : -1}
					class="tab"
					class:tab--active={active === 'search'}
					onclick={() => selectTab('search')}
					onkeydown={(e) => handleKey(e, tabs)}
				>Search</button>
				<button
					type="button"
					role="tab"
					id="tab-write"
					aria-selected={active === 'write'}
					aria-controls="panel-write"
					tabindex={active === 'write' ? 0 : -1}
					class="tab"
					class:tab--active={active === 'write'}
					onclick={() => selectTab('write')}
					onkeydown={(e) => handleKey(e, tabs)}
				>Write</button>
				<button
					type="button"
					role="tab"
					id="tab-embed"
					aria-selected={active === 'embed'}
					aria-controls="panel-embed"
					tabindex={active === 'embed' ? 0 : -1}
					class="tab"
					class:tab--active={active === 'embed'}
					onclick={() => selectTab('embed')}
					onkeydown={(e) => handleKey(e, tabs)}
				>Embed</button>
			</div>
		{/if}
		<span class="active-relay" aria-live="polite">{activeRelay ? `← ${activeRelay}` : ''}</span>
	</div>

	<div
		class="panel"
		role="tabpanel"
		id="panel-search"
		aria-labelledby="tab-search"
		hidden={active !== 'search'}
	>
		{#if active === 'search'}
			<NostrAiSearch {register} onActiveRelay={(r) => (activeRelay = r)} activeRelay={activeRelay} />
		{/if}
	</div>
	<div
		class="panel"
		role="tabpanel"
		id="panel-write"
		aria-labelledby="tab-write"
		hidden={active !== 'write'}
	>
		{#if active === 'write'}
			<NostrAiWrite {register} onActiveRelay={(r) => (activeRelay = r)} />
		{/if}
	</div>
	<div
		class="panel"
		role="tabpanel"
		id="panel-embed"
		aria-labelledby="tab-embed"
		hidden={active !== 'embed'}
	>
		{#if active === 'embed'}
			<NostrAiEmbed {register} />
		{/if}
	</div>
</div>

<style>
	.agent-shell {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
	.topbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
	}
	.tabs {
		display: inline-flex;
		gap: 2px;
		padding: 4px;
		border-radius: 999px;
		background: var(--register-card);
		border: 1px solid var(--register-hair);
	}
	.tab {
		padding: 8px 16px;
		border-radius: 999px;
		font-size: 13px;
		font-weight: 600;
		background: transparent;
		border: 0;
		color: var(--register-text);
		cursor: pointer;
	}
	.tab--active {
		background: var(--register-accent);
		color: var(--register-accent-ink);
	}
	.active-relay {
		font-family: var(--font-mono, ui-monospace, monospace);
		font-size: 11px;
		color: var(--register-muted);
	}
	.panel {
		animation: panel-in 0.3s ease-out;
	}
	@keyframes panel-in {
		from {
			opacity: 0;
			transform: translateY(4px);
		}
		to {
			opacity: 1;
			transform: none;
		}
	}
</style>
