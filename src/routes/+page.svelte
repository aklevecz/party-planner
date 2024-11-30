<script>
	import ApplyContainer from '$lib/components/apply/apply-container.svelte';
	import AuthFlow from '$lib/components/auth/auth-flow.svelte';
	import VoteContainer from '$lib/components/vote/vote-container.svelte';
	import app from '$lib/store/app.svelte.js';
	import authSvelte from '$lib/store/auth.svelte';
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
	<ApplyContainer />
	<VoteContainer />
	<div>{authSvelte.state.user.phoneNumber}</div>
	<AuthFlow />
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 1rem;
		gap: 0.5rem;
		/* align-items: center; */
	}
	p {
		font-size: 1.2rem;
	}
</style>
