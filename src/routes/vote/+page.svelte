<script>
	import AuthFlow from '$lib/components/auth/auth-flow.svelte';
	import VoteContainer from '$lib/components/vote/vote-container.svelte';
	import authSvelte from '$lib/store/auth.svelte';

	/** @type {{ data: import('./$types').PageData }} */
	let { data } = $props();
</script>

<div class="container">
	<h1>Vote</h1>
	<div style="text-align: center;">Things will be voted on here</div>
	{#if authSvelte.state.authorized}<VoteContainer />{/if}
	<!-- {#if !authSvelte.state.authorized}<AuthFlow />{/if} -->
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-self: center;
		padding: 1rem;
		gap: 0.5rem;
	}
	h1 {
		text-align: center;
	}
</style>
