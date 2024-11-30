<script>
	import applySvelte from '$lib/store/apply.svelte';
	import { onMount } from 'svelte';

	import Header from '$lib/components/header.svelte';
	import '../app.css';

	/** @type {{ data: import('./$types').LayoutData, children: import('svelte').Snippet }} */
	let { data, children } = $props();

	onMount(() => {
		if (data.applyId) {
			applySvelte.getExistingRecord(data.applyId);
		}
	});
</script>

<Header />
{@render children()}
<!-- <div>Brought to you by Raptor enterprises</div> -->