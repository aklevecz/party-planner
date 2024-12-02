<script>
	import { goto } from '$app/navigation';
	import applySvelte from '$lib/store/apply.svelte';
	import RaptorAnimated from '../raptor-animated.svelte';

	let { id, name, email, message } = $state(applySvelte.state);

	$effect(() => {
		name = applySvelte.state.name;
		email = applySvelte.state.email;
		message = applySvelte.state.message;
		id = applySvelte.state.id;
	});

	async function onApply() {
		if (!name || !email || !message) return;
		await applySvelte.apply({ name, email, message });
        // nextView()
		goto('/?view=receipt');
	}

	let isFilledOut = $derived(name && email && message);
</script>

<div class="apply-form" id="apply-form">
    <div style="font-weight:bold;">Please provide your name, email, and a message about what you would like to do for the event</div>
	<!-- <div>Some of the pillars of the event include: art, music, entry</div> -->
	<!-- <div>It can be specific or general, and even if there isn't a particularly good fit for what you would like to do, you can still help out in other ways</div> -->
	<input bind:value={name} type="text" placeholder="Name" />
	<input bind:value={email} type="text" placeholder="Email" />
	<textarea bind:value={message} placeholder="Stuff you would like to do"></textarea>
	<button disabled={applySvelte.fetching || !isFilledOut} onclick={onApply}>{#if applySvelte.fetching}<RaptorAnimated />{:else}Apply{/if}</button>
</div>

<style>
	.apply-form {
		display: flex;
		flex-direction: column;
		max-width: 500px;
		gap: 1rem;
	}
</style>
