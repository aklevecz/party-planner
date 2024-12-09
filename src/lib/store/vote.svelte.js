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
		/** @param {string} id */
		getUserVote: async (id) => {
			const response = await fetch(`/api/vote?type=user&id=${id}`, {
				method: 'GET',
				headers: noCacheHeaders
			});
			const data = await response.json();
			return data;
		},
		/** @param {string} id */
		getAllVotes: async (id) => {
			const response = await fetch(`/api/vote?type=all&id=${id}`, {
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
			return await api.getUserVote(id);
		},
		getAllVotes: async () => {
			const allVotes = await api.getAllVotes(id);
			console.log(`allVotes: ${JSON.stringify(allVotes)}`);
			vote.votes = allVotes;
		}
	};
};

export const monthVote = createVoteStore('month', {
	'January': 0,
	'February': 0,
	'March': 0,
	'April': 0,
});
