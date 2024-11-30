<script>
	import applySvelte from '$lib/store/apply.svelte';

	/** @type {{nextView: () => void}} props */
	let { nextView } = $props();

	let { id, name, email, message } = $state(applySvelte.state);

	$effect(() => {
		name = applySvelte.state.name;
		email = applySvelte.state.email;
		message = applySvelte.state.message;
		id = applySvelte.state.id;
	});

	function onApply() {
		applySvelte.apply({ name, email, message });
        nextView()
	}
</script>

<div class="apply-form">
    <div style="font-weight:bold;">Please provide your name and email, and a message about why you would like to help manage this event</div>
	<!-- <div>Some of the pillars of the event include: art, music, entry</div> -->
	<!-- <div>It can be specific or general, and even if there isn't a particularly good fit for what you would like to do, you can still help out in other ways</div> -->
	<input bind:value={name} type="text" placeholder="Name" />
	<input bind:value={email} type="text" placeholder="Email" />
	<textarea bind:value={message} placeholder="Message"></textarea>
	<button onclick={onApply}>Apply</button>
</div>

<style>
	.apply-form {
		display: flex;
		flex-direction: column;
		max-width: 500px;
		gap: 1rem;
	}
</style>
