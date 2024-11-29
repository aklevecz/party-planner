<script>
	import ApplyContainer from '$lib/components/apply/apply-container.svelte';
	import app from '$lib/store/app.svelte.js';
	let { data } = $props();

	$effect(() => {
		app.view = data.view;
	});
</script>

<div class="container">
	<div>Let's throw a party at The Faight</div>
	<div>This site will continue to evolve and be apart of the party</div>
	<div>But first I need help managing the project because I suck at that</div>
	<div>________</div>
	<ApplyContainer />
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 1rem;
		gap: .5rem;
		/* align-items: center; */
	}
	p {
		font-size: 1.2rem;
	}
</style>
