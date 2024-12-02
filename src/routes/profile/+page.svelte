<script>
	import AuthFlow from '$lib/components/auth/auth-flow.svelte';
	import authSvelte from '$lib/store/auth.svelte';

	/** @type {{ data: import('./$types').PageData }} */
	let { data } = $props();
</script>

<h1 style="text-align: center;">Profile</h1>
<div>
	<div style="text-align: center;">To be implemented...</div>
	{#if authSvelte.state.authorized}
		<div>Phone: {authSvelte.state.user.phoneNumber}</div>
		<button onclick={authSvelte.logout}>Logout</button>
	{/if}
	{#if !authSvelte.state.authorized}
		<!-- <AuthFlow /> -->
	{/if}
</div>
