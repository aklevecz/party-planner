<script>
	import AuthFlow from '$lib/components/auth/auth-flow.svelte';
	import authSvelte from '$lib/store/auth.svelte';

	/** @type {{ data: import('./$types').PageData }} */
	let { data } = $props();
	console.log(authSvelte.state.user)
</script>

<h1 style="text-align: center;">Profile</h1>
<div class="container">
	{#if authSvelte.state.authorized}
		<div>Phone: {authSvelte.state.user.phoneNumber}</div>
		<button onclick={authSvelte.logout}>Logout</button>
	{/if}
	{#if !authSvelte.state.authorized}
		<AuthFlow />
	{/if}
</div>

<style>
	.container {
		display: flex;
		align-items: center;
		flex-direction: column;
		gap: 1rem;
	}
</style>
