<script>
	import { goto } from '$app/navigation';
	import roles from '$lib/roles';
	import app from '$lib/store/app.svelte';
	import applySvelte from '$lib/store/apply.svelte';
	import { generateScrollTo } from '$lib/utils';
	import ApplyForm from './apply-form.svelte';
	import { onMount } from 'svelte';

	let hasApplied = $derived(applySvelte.state.id);

	/** @type {*} */
	let interval = null
	function goToApplyForm() {
		goto('/?view=apply-form');
		clearInterval(interval);
		setTimeout(() => {
			generateScrollTo('apply-form');
		}, 500);
	}

	// Combine the list into a single string
	let fullText = roles.join(', ');
	let displayedText = $state('Calling all ');
	let index = 0;

	// onMount: start the typewriter effect
	onMount(() => {
		 interval = setInterval(() => {
			if (index < fullText.length) {
				displayedText += fullText[index];
				index++;
				if (index % 10 === 0) {
					generateScrollTo('apply-button');
				}
			} else {
				clearInterval(interval);
			}
		}, 100); // 50ms delay between characters
	});
</script>

{#if hasApplied && app.view === 'intro'}
	<h3>You have already applied</h3>
	<div>
		<div>{applySvelte.state.name}</div>
		<div>{applySvelte.state.email}</div>
		<div style="margin-top:1rem;">{applySvelte.state.message}</div>
	</div>
	<button onclick={goToApplyForm}>Change Answers</button>
{:else if !hasApplied && app.view === 'intro'}
	<div class="info-line">Interested in joining the team?</div>
	<!-- Typewriter animation displaying the list -->
	<div class="info-line typewriter">{displayedText}</div>
	<button id="apply-button" class="pulse" onclick={goToApplyForm}>Tap here!</button>
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
{/if}

<style>
	h3 {
		margin: 0;
	}
	.info-line {
		margin-top: 1rem;
		font-size: 1.5rem;
	}
	/* Typewriter styling */
	.typewriter {
		font-family: monospace;
		/* white-space: pre; */
		overflow: hidden;
		border-right: 2px solid;
	}
	div {
		text-align: left;
		font-weight: bold;
		font-size: 1.2rem;
	}
	.pulse {
		animation: pulse 1s infinite;
	}
	@keyframes pulse {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.1);
		}
		100% {
			transform: scale(1);
		}
	}
</style>
