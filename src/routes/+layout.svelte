<script>
	import applySvelte from '$lib/store/apply.svelte';
	import { onMount } from 'svelte';

	import Header from '$lib/components/header.svelte';
	import '../app.css';
	import authSvelte from '$lib/store/auth.svelte';

	/** @type {{ data: import('./$types').LayoutData, children: import('svelte').Snippet }} */
	let { data, children } = $props();

	onMount(() => {
		if (data.applyId) {
			applySvelte.getExistingRecord(data.applyId);
		}
		authSvelte.init(data);
	});
</script>

<svelte:head>
	<!-- Basic Meta Tags -->
	<title>Raptor Party - Faight Collective</title>
	<meta
		name="description"
		content="Join the Raptor Party at Faight Collective - Experience the revolution in collective collaboration"
	/>
	<meta name="keywords" content="Raptor Party, Faight Collective, collaboration, community" />
	<meta name="author" content="teh raptor" />

	<!-- Open Graph Meta Tags -->
	<meta property="og:title" content="Raptor Party - Faight Collective" />
	<meta
		property="og:description"
		content="Join the Raptor Party at Faight Collective - Experience the revolution in collective collaboration"
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://faight.raptor.pizza" />
	<meta property="og:image" content="https://faight.raptor.pizza/remi-raptor.png" />
	<meta property="og:image:width" content="1080" />
	<meta property="og:image:height" content="1080" />
	<meta property="og:site_name" content="Raptor Party - Faight Collective" />

	<!-- Twitter Card Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Raptor Party - Faight Collective" />
	<meta
		name="twitter:description"
		content="Join the Raptor Party at Faight Collective - Experience the revolution in collective collaboration"
	/>
	<meta name="twitter:image" content="https://faight.raptor.pizza/remi-raptor.png" />

	<!-- Additional Meta Tags -->
	<meta name="theme-color" content="#ff0000" />
	<meta name="robots" content="index, follow" />
	<link rel="canonical" href="https://faight.raptor.pizza" />
</svelte:head>
<Header />
{@render children()}
<!-- <div>Brought to you by Raptor enterprises</div> -->
