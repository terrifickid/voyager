<script>
	import Icon from './Icon.svelte';

	const columns = [
		{
			title: 'Product',
			links: [
				{ label: 'Plan a trip', href: '/plan' },
				{ label: 'Set preferences', href: '/preferences' },
				{ label: 'Voyager Pay', href: '/pay' },
				{ label: 'Security by design', href: '/pay/security' },
				{ label: 'Fair pricing', href: '/pay/pricing' },
				{ label: 'Run a node', href: '/pay/node' },
				{ label: 'How it works', href: '/' }
			]
		},
		{
			title: 'Company',
			links: [
				{ label: 'About', href: '/' },
				{ label: 'Careers', href: '/' },
				{ label: 'Contact', href: '/' }
			]
		},
		{
			title: 'Resources',
			links: [
				{ label: 'Documentation', href: '/docs' },
				{ label: 'Help center', href: '/' },
				{ label: 'Privacy', href: '/' },
				{ label: 'Terms', href: '/' }
			]
		}
	];
</script>

<footer class="bg-bone-100 pt-20 pb-10">
	<div class="mx-auto max-w-6xl px-6">
		<div class="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
			<div class="flex flex-col gap-5">
				<a href="/" class="font-display text-2xl text-ink">Voyager</a>
				<p class="max-w-xs text-[15px] leading-relaxed text-ink-2">
					Plan trips on your device. No account. No tracking. Your itinerary stays on your machine.
				</p>
				<div class="flex items-center gap-2">
					<button
						type="button"
						class="inline-flex items-center gap-2 rounded-pill bg-bone-200 px-4 py-2 text-sm font-semibold text-ink"
					>
						<Icon name="globe" tone="ink-2" size={16} />
						English
						<span aria-hidden="true" class="text-[1.05em] leading-none">⌄</span>
					</button>
				</div>
			</div>

			{#each columns as col (col.title)}
				<nav class="flex flex-col gap-4">
					<p class="eyebrow">{col.title}</p>
					<ul class="flex flex-col gap-3">
						{#each col.links as link (link.label)}
							<li>
								<a href={link.href} class="text-[15px] text-ink-2 hover:text-ink">
									{link.label}
								</a>
							</li>
						{/each}
					</ul>
				</nav>
			{/each}
		</div>

		<div class="mt-16 flex flex-col gap-3 border-t border-bone-200 pt-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
			<p>© {new Date().getFullYear()} Voyager. Demo build.</p>
			<p>Runs on your device. No API key. No data leaves your machine.</p>
		</div>
	</div>
</footer>
