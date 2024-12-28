<script>
	import AuthFlow from '$lib/components/auth/auth-flow.svelte';
	import VoteContainerMeetingone from '$lib/components/vote/vote-container-meetingone.svelte';
	// import VoteContainerDow from '$lib/components/vote/vote-container-dow.svelte';
	// import VoteContainer from '$lib/components/vote/vote-container.svelte';
	import authSvelte from '$lib/store/auth.svelte';

	/** @type {{ data: import('./$types').PageData }} */
	let { data } = $props();
</script>

<div class="container">
	<h1>Vote</h1>
	{#if !authSvelte.state.authorized}
		<div class="autoblock">
			<div
				style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem"
			>
				<div class="textcenter">Sign in to vote</div>
				<img style="width:70px;height:70px;" src="/raptor-svg.svg" alt="raptor" />
			</div>
			<AuthFlow />
		</div>
	{/if}
	<!-- <div class="textcenter">Things will be voted on here</div> -->
	<!-- <VoteContainer /> -->
	<!-- <VoteContainerDow/> -->
	<!-- <VoteContainerMeetingone /> -->
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
