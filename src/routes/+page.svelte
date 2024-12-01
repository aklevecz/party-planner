<script>
	import ApplyContainer from '$lib/components/apply/apply-container.svelte';
	import app from '$lib/store/app.svelte.js';
	let { data } = $props();

	$effect(() => {
		app.view = data.view;
	});
</script>

<div class="container">
	<div style="font-size:1.5rem;">Let's throw a party at The Faight Collective</div>
	<div>This site will continue to evolve and be apart of the party</div>
	<div
		style="background-color: var(--color-interactive); height:10px; width:100%;margin:1rem 0;"
	></div>
		<img src="/raptor-svg.svg" alt="raptor" style="width:200px;margin:0rem auto 1rem;display:block;"/>

	<ApplyContainer />
	<!-- {#if authSvelte.state.authorized}<VoteContainer />{/if} -->
	<!-- <AuthFlow /> -->
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 1rem;
		gap: 0.5rem;
		margin: auto;
		max-width: 500px;
		/* align-items: center; */
	}
</style>
