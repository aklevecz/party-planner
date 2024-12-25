<script>
	import authSvelte from '$lib/store/auth.svelte';
	import { meetingOneVote } from '$lib/store/vote.svelte';
	import { camelToPhrase } from '$lib/utils';
	import { onMount } from 'svelte';

	/** @type {string[]} */
	let selectedOptions = $state([]);
	let hasVoted = $state(false);

	onMount(() => {
		meetingOneVote.getUserVote().then((vote) => {
			console.log(`user votes: ${JSON.stringify(vote)}`);
			if (vote) {
				console.log(`selected vote: ${vote}`);
				selectedOptions = vote;
				hasVoted = true;
			}
		});
		meetingOneVote.getAllVotes();
	});

	/** @param {string} option */
	async function handleVote(option) {
		// if (!hasVoted) {
		// selectedOptions = option;
		hasVoted = true;
		await meetingOneVote.vote(option);
		meetingOneVote.getUserVote().then((vote) => {
			if (vote) {
				selectedOptions = vote;
			}
		});
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

	/** @param {string} option */
	function isSelected(option) {
		return selectedOptions.includes(option);
	}
</script>

<div class:disabled={!authSvelte.state.authorized} class="vote-container">
	<h3>Vote for the {camelToPhrase(meetingOneVote.state.id)}</h3>

	<div class="options-list">
		{#each Object.keys(meetingOneVote.state.options) as option}
			<button
				class="vote-option {isSelected(option) ? 'selected' : ''}"
				onclick={() => handleVote(option)}
				disabled={!authSvelte.state.authorized}
			>
				<div class="option-content">
					<div class="option-left">
						{#if isSelected(option)}
							<span class="checkmark">✓</span>
						{/if}
						<span class="option-text">{option.replace(/_/g, ' ')}</span>
					</div>
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
		opacity: 0.5;
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
		/* border-color: #56d569; */
		/* background: #f0f7ff; */
		/* background: #56d569; */
	}

	.vote-option:disabled {
		cursor: default;
		opacity: 0.7;
	}

	.option-left {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.checkmark {
		color: #4a90e2;
		font-weight: bold;
		font-size: 1.2rem;
	}

	.option-content {
		position: relative;
		z-index: 2;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 10px;
		position: relative;
		z-index: 2;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 10px;
		width: 100%;
	}

	.option-text {
		flex: 1;
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
