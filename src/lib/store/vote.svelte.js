import { get } from 'svelte/store';

const noCacheHeaders = {
	'Content-Type': 'application/json',
	'Cache-Control': 'no-cache, no-store, must-revalidate',
	Pragma: 'no-cache',
	Expires: '0'
};

const api = (function () {
	return {
		/** @param {string} id @param {string} option */
		vote: async (id, option) => {
			const response = await fetch('/api/vote', {
				method: 'POST',
				headers: noCacheHeaders,
				body: JSON.stringify({
					id,
					option
				})
			});
			const data = await response.json();
			return data;
		},
		getUserVote: async () => {
			const response = await fetch('/api/vote?type=user', {
				method: 'GET',
				headers: noCacheHeaders
			});
			const data = await response.json();
			return data;
		},
		getAllVotes: async () => {
			const response = await fetch('/api/vote?type=all', {
				method: 'GET',
				headers: noCacheHeaders
			});
			const data = await response.json();
			console.log(`getAllVotes: ${JSON.stringify(data)}`);
			return data;
		},
		/** @param {string} id */
		getOptions: async (id) => {
			const response = await fetch(`/api/vote?id=${id}&type=options`, {
				method: 'GET',
				headers: noCacheHeaders
			});
			const data = await response.json();
			return data;
		},
		/** @param {string} id */
		getVotesForId: async (id) => {
			const response = await fetch(`/api/vote?id=${id}&type=votes`, {
				method: 'GET',
				headers: noCacheHeaders
			});
			const data = await response.json();
			return data;
		}
	};
})();

/**
 * @param {string} id
 * @param {Record<string, number>} options
 */
const createVoteStore = (id, options) => {
	let vote = $state({ id, options, votes: [] });

	return {
		get state() {
			return vote;
		},
		/** @param {string} id */
		initDynamicVotes: async (id) => {
			const options = await api.getOptions(id);
			const votes = await api.getVotesForId(id);
			vote = { id, options, votes };
		},
		/** @param {string} option */
		vote: async (option) => {
			const allVotes = await api.vote(id, option);
			// const allVotes = await api.getAllVotes();
			vote.votes = allVotes.votes;
			// vote.votes = data.votes;
		},
		getUserVote: async () => {
			return await api.getUserVote();
		},
		getAllVotes: async () => {
			const allVotes = await api.getAllVotes();
			vote.votes = allVotes;
		}
	};
};

export const dateVote = createVoteStore('date', {
	'2025-01-01': 0,
	'2025-01-13': 0,
	'2025-01-26': 0
});
