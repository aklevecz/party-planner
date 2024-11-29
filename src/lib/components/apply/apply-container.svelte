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
	<h2>You have already applied</h2>
	<div>{applySvelte.state.name}</div>
	<div>{applySvelte.state.email}</div>
	<div>{applySvelte.state.message}</div>
	<button onclick={goToApplyForm}>Edit</button>
{:else if !hasApplied && app.view === 'intro'}
	<h2>Apply to be the project manager of the raptor party at The Faight</h2>
	<button style="margin: 2rem auto;" onclick={goToApplyForm}>Apply</button>
{/if}

{#if app.view === 'apply-form'}
	<ApplyForm nextView={() => goto('/?view=receipt')} />
{/if}
{#if app.view === 'receipt'}
	<h2>You have applied!</h2>
	<div>We'll be in touch :)</div>
	<div>
		Even if you don't get the main managing position there will surely be a place for you to help
		out or energize the dance floor
    </div>
{/if}

<!-- {#if app.view !== 'intro'}
	<button onclick={() => history.back()}>back</button>
{/if} -->

<style>
	h2 {
		margin: 0;
	}
</style>
