<script>
	import { goto } from '$app/navigation';
	import RsvpForm from './rsvp-form.svelte';
	import rsvp from '$lib/store/rsvp.svelte';
	import app from '$lib/store/app.svelte';
	import { onMount } from 'svelte';

	let { rsvpId } = $props();

	function goToInfoForm() {
		// app.view = 'info';
		app.setView('info');
		goto('/?view=info');
	}

	onMount(() => {
		if (rsvpId) {
            // jank
			setTimeout(() => {
				app.setView('rsvped');
			}, 10);
			// app.view = 'rsvped';
		}
	});
</script>

{#if app.view === 'intro'}
	<h3>The party will be on February 8th</h3>
	<h3>Time and other details tbd</h3>
	<button onclick={goToInfoForm}>RSVP for updates</button>
{/if}

{#if app.view === 'info'}
	<h3>RSVP for updates</h3>
	<RsvpForm />
{/if}

{#if app.view === 'rsvped'}
	<h3>Thanks for RSVPing!</h3>
{/if}

<style>
	h3 {
		margin: 0;
	}
</style>
