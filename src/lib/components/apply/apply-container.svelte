<script>
	import { goto } from '$app/navigation';
	import app from '$lib/store/app.svelte';
	import applySvelte from '$lib/store/apply.svelte';
	import ApplyForm from './apply-form.svelte';

	let hasApplied = $derived(applySvelte.state.id);

	function goToApplyForm() {
		goto('/?view=apply-form');
	}
</script>

{#if hasApplied && app.view === 'intro'}
	<h3>You have already applied</h3>
	<div>{applySvelte.state.name}</div>
	<div>{applySvelte.state.email}</div>
	<div>{applySvelte.state.message}</div>
	<button onclick={goToApplyForm}>Change Answers</button>
{:else if !hasApplied && app.view === 'intro'}
	<div>This will fittingly be a collective effort</div>
	<div>Interested in helping out?</div>
	<div>Apply to be part of the party planning</div>
	<!-- <div>Firstly we would like to find people interested in being</div>
	<h3>Project Managers</h3>
	<div>Do you enjoy organizing ideas, people, and scheduling?</div>
	<div>Well boy howdy let's see if we can find your talents a place for this rager</div> -->
	<button style="margin: 2rem auto;font-size:1.5rem;" onclick={goToApplyForm}>Apply</button>
{/if}

{#if app.view === 'apply-form'}
	<ApplyForm />
{/if}
{#if app.view === 'receipt'}
	<h3>You have applied!</h3>
	<div>We'll be in touch :)</div>
	<h3 style="margin-top:1rem;"></h3>
	<div>{applySvelte.state.name}</div>
	<div>{applySvelte.state.email}</div>
	<div>{applySvelte.state.message}</div>
	<!-- <div>
		Even if you don't get the main managing position there will surely be a place for you to help
		out or energize the dance floor
    </div> -->
{/if}

<!-- {#if app.view !== 'intro'}
	<button onclick={() => history.back()}>{"<"}</button>
{/if} -->

<style>
	h3 {
		margin: 0;
	}
	div {
		font-size: 1.2rem;
	}
</style>
