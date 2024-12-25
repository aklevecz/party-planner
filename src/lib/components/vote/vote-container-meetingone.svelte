<script>
	import authSvelte from '$lib/store/auth.svelte';
	import { meetingOneVote } from '$lib/store/vote.svelte';
	import { camelToPhrase } from '$lib/utils';
	import { onMount } from 'svelte';

	let selectedOption = $state('');
	let hasVoted = $state(false);

	onMount(() => {
		meetingOneVote.getUserVote().then((vote) => {
			if (vote) {
				console.log(`selected vote: ${vote}`)
				selectedOption = vote;
				hasVoted = true;
			}
		});
		meetingOneVote.getAllVotes();
	});

	/** @param {string} option */
	function handleVote(option) {
		// if (!hasVoted) {
		selectedOption = option;
		hasVoted = true;
		meetingOneVote.vote(option);
		// }
	}

	/** @param {string} option */
	function getVoteCount(option) {
		return meetingOneVote.state.votes.reduce((acc, votes) => {
			if (votes.includes(option)) {
				return acc + 1;
			}
			return acc;
		}, 0);
	}

	/** @param {string} option */
	function getPercentage(option) {
		const total = meetingOneVote.state.votes.length;
		const votes = getVoteCount(option);
		return total === 0 ? 0 : Math.round((votes / total) * 100);
	}
</script>

<div class:disabled={!authSvelte.state.authorized} class="vote-container">
	<h3>Vote for the {camelToPhrase(meetingOneVote.state.id)}</h3>

	<div class="options-list">
		{#each Object.keys(meetingOneVote.state.options) as option}
			<button
				class="vote-option {selectedOption === option ? 'selected' : ''}"
				onclick={() => handleVote(option)}
				disabled={!authSvelte.state.authorized}
			>
				<div class="option-content">
					<span class="option-text">{option.replace(/_/g, ' ')}</span>
						<span class="vote-count">
							{getVoteCount(option)} votes ({getPercentage(option)}%)
						</span>
				</div>
					<div class="progress-bar" style="width: {getPercentage(option)}%"></div>
			</button>
		{/each}
	</div>

	{#if hasVoted}
		<p class="thank-you">Thanks for voting!</p>
	{/if}
</div>

<style>
	.disabled {
		opacity: .5;
	}
	.vote-container {
		max-width: 500px;
		margin: 20px auto;
		padding: 20px;
		background: var(--color-foreground);
		border-radius: 12px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	h3 {
		margin: 0 0 20px 0;
		font-size: 1.5rem;
		text-align: center;
		color: black;
	}

	.options-list {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.vote-option {
		position: relative;
		width: 100%;
		padding: 16px;
		border: 2px solid #e0e0e0;
		border-radius: 8px;
		background: var(--color-foreground);
		cursor: pointer;
		overflow: hidden;
		text-align: left;
		transition: all 0.2s ease;
	}

	.vote-option:hover:not(:disabled) {
		border-color: #4a90e2;
		background: #f8f9fa;
	}

	.vote-option.selected {
		border-color: #4a90e2;
		background: #f0f7ff;
	}

	.vote-option:disabled {
		cursor: default;
		opacity: 0.7;
	}

	.option-content {
		position: relative;
		z-index: 2;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 10px;
	}

	.option-text {
		font-size: 1rem;
		color: black;
	}

	.vote-count {
		font-size: 0.9rem;
		color: #666;
	}

	.progress-bar {
		position: absolute;
		left: 0;
		top: 0;
		height: 100%;
		background: rgba(74, 144, 226, 0.1);
		transition: width 0.3s ease;
		z-index: 1;
	}

	.thank-you {
		margin-top: 20px;
		text-align: center;
		color: var(--color-interactive);
		font-size: 0.9rem;
	}

	@media (max-width: 600px) {
		.vote-container {
			margin: 10px;
			padding: 15px;
		}

		.vote-option {
			padding: 12px;
		}
	}
</style>
