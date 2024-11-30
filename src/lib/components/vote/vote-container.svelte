<script>
    import { dateVote } from "$lib/store/vote.svelte";

    let selectedOption = $state("")
    let hasVoted = $state(false)

    /** @param {string} option */
    function handleVote(option) {
        if (!hasVoted) {
            selectedOption = option;
            hasVoted = true;
            dateVote.vote(option);
            // Here you would typically update your store/backend
        }
    }

    /** @param {string} option */
    function getPercentage(option) {
        const total = Object.values(dateVote.state.options).reduce((sum, votes) => sum + votes, 0);
        const votes = dateVote.state.options[option];
        return total === 0 ? 0 : Math.round((votes / total) * 100);
    }
</script>

<div class="vote-container">
    <h3>Vote for the {dateVote.state.id}</h3>
    
    <div class="options-list">
        {#each Object.keys(dateVote.state.options) as option}
            <button 
                class="vote-option {selectedOption === option ? 'selected' : ''}"
                onclick={() => handleVote(option)}
                disabled={hasVoted && selectedOption !== option}
            >
                <div class="option-content">
                    <span class="option-text">{option}</span>
                    {#if hasVoted}
                        <span class="vote-count">
                            {dateVote.state.options[option]} votes ({getPercentage(option)}%)
                        </span>
                    {/if}
                </div>
                {#if hasVoted}
                    <div 
                        class="progress-bar" 
                        style="width: {getPercentage(option)}%"
                    ></div>
                {/if}
            </button>
        {/each}
    </div>

    {#if hasVoted}
        <p class="thank-you">Thanks for voting!</p>
    {/if}
</div>

<style>
    .vote-container {
        max-width: 500px;
        margin: 20px auto;
        padding: 20px;
        background: #fff;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    h3 {
        margin: 0 0 20px 0;
        font-size: 1.5rem;
        color: #333;
        text-align: center;
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
        background: transparent;
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
        color: #333;
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
        color: #4a90e2;
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