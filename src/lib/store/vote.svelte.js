const noCacheHeaders = {
	'Content-Type': 'application/json',
	'Cache-Control': 'no-cache, no-store, must-revalidate',
	Pragma: 'no-cache',
	Expires: '0'
};

const api = (function () {
	return {
		/** @param {string} id @param {string} option @param {Options} options */
		vote: async (id, option, options) => {
			const response = await fetch('/api/vote', {
				method: 'POST',
				headers: noCacheHeaders,
				body: JSON.stringify({
					id,
					option,
					options
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
			console.log(`getUserVote: ${JSON.stringify(data)}`);
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
// OPTIONS ARE A BIT CONFUSING
/**
 * @param {string} id
 * @param {Record<string, number>} voteOptions
 * @param {Options} options
 */
const createVoteStore = (id, voteOptions, options) => {
	/** @type {{id:string, options:Record<string, number>, votes:string[]}} */
	let vote = $state({ id, options: voteOptions, votes: [] });

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
			const allVotes = await api.vote(id, option, options);
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
			if (options.multipleVotes) {
				let parsedVotes = allVotes.map((/** @type {string} */ vote) => {
					return JSON.parse(vote);
				});
				vote.votes = parsedVotes;
			} else {
				vote.votes = allVotes;
			}
			console.log(vote.votes)
		}
	};
};

export const monthVote = createVoteStore(
	'month',
	{
		January: 0,
		February: 0,
		March: 0,
		April: 0
	},
	{
		multipleVotes: false
	}
);

export const dayOfTheWeekVote = createVoteStore(
	'dayOfTheWeek',
	{
		weekday: 0,
		weekend: 0,
		'not important to me': 0
	},
	{
		multipleVotes: false
	}
);

export const meetingOneVote = createVoteStore(
	'meetOneVote',
	{
		January_6th_5pm_Monday: 0,
		January_6th_6pm_Monday: 0,
		January_6th_7pm_Monday: 0,
		January_6th_8pm_Monday: 0,
		January_7th_5pm_Tuesday: 0,
		January_7th_6pm_Tuesday: 0,
		January_7th_7pm_Tuesday: 0,
		January_7th_8pm_Tuesday: 0,
		January_8th_5pm_Wednesday: 0,
		January_8th_6pm_Wednesday: 0,
		January_8th_7pm_Wednesday: 0,
		January_8th_8pm_Wednesday: 0,
		January_9th_5pm_Thursday: 0,
		January_9th_6pm_Thursday: 0,
		January_9th_7pm_Thursday: 0,
		January_9th_8pm_Thursday: 0,
		January_10th_5pm_Friday: 0,
		January_10th_6pm_Friday: 0,
		January_10th_7pm_Friday: 0,
		January_10th_8pm_Friday: 0
	},
	{
		multipleVotes: true
	}
);
