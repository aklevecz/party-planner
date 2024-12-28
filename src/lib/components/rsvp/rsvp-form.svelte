<script>
	import { goto } from '$app/navigation';
	import rsvp from '$lib/store/rsvp.svelte';
	import RaptorAnimated from '../raptor-animated.svelte';
	import TelInput from '../tel-input.svelte';

	let { name, phoneNumber } = $state(rsvp.state);

	let valid = $state(false)
	let detailedValue = $state(null)
	let selectedCountry = $state("US")

	$effect(() => {
		name = rsvp.state.name;
		phoneNumber = rsvp.state.phoneNumber;
	});

	async function onRSVP() {
		if (!name|| !phoneNumber) return;
		await rsvp.rsvp({ name, phoneNumber });
        // nextView()
		goto('/?view=rsvped');
	}

	let isFilledOut = $derived(name && phoneNumber);
</script>

<div class="apply-form" id="apply-form">
    <div style="font-weight:bold;">You will receive updates about the event</div>
	<!-- <div>Some of the pillars of the event include: art, music, entry</div> -->
	<!-- <div>It can be specific or general, and even if there isn't a particularly good fit for what you would like to do, you can still help out in other ways</div> -->
	<input bind:value={name} type="text" placeholder="Name" />
	<TelInput bind:phoneNumber={phoneNumber} bind:valid bind:detailedValue bind:selectedCountry/>
	<button disabled={rsvp.fetching || !isFilledOut || !valid} onclick={onRSVP}>{#if rsvp.fetching}<RaptorAnimated />{:else}Submit{/if}</button>
</div>

<style>
	.apply-form {
		display: flex;
		flex-direction: column;
		max-width: 500px;
		gap: 1rem;
	}
</style>
