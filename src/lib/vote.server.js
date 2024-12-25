/** @param {*} platform */
const voteDB = (platform) => {
	return {
		/** @param {{voteId:string, userId:string, option:string, options:Options}} props */
		vote: async ({ voteId, userId, option, options }) => {
			if (options.multipleVotes === false) {
				// For single votes, we use REPLACE which is SQLite's way of handling UPSERT
				await platform?.env.DATABASE.prepare(
					`INSERT INTO votes (vote_id, voter_id, vote) 
					 VALUES (?, ?, ?) 
					 ON CONFLICT (vote_id, voter_id) DO UPDATE SET vote = ?`
				)
					.bind(voteId, userId, option, option)
					.run();
			} else {
				// For multiple votes, first get existing votes
				const result = await platform?.env.DATABASE.prepare(
					`SELECT vote FROM votes WHERE voter_id = ? AND vote_id = ?`
				)
					.bind(userId, voteId)
					.first();

				let votes = [];
				try {
					votes = result ? JSON.parse(result.vote) : [];
				} catch (e) {
					// Handle parsing error, use empty array as fallback
					votes = [];
				}

				// Toggle the vote
				if (!votes.includes(option)) {
					votes.push(option);
				} else {
					votes.splice(votes.indexOf(option), 1);
				}

				// Update or insert the votes
				await platform?.env.DATABASE.prepare(
					`INSERT INTO votes (vote_id, voter_id, vote) 
					 VALUES (?, ?, ?) 
					 ON CONFLICT (vote_id, voter_id) DO UPDATE SET vote = ?`
				)
					.bind(voteId, userId, JSON.stringify(votes), JSON.stringify(votes))
					.run();
			}
		},
		/** @param {{voteId:string, userId:string}} props */
		getUserVote: async ({ voteId, userId }) => {
			return await platform?.env.DATABASE.prepare(
				`SELECT vote FROM votes WHERE voter_id = ? AND vote_id = ?`
			)
				.bind(userId, voteId)
				.first();
		},
		/** @param {{voteId:string}} props */
		getAllVotes: async ({ voteId }) => {
			console.log(`getting all votes db`);
			/** @type {{voter: string, vote: string}[]} */
			let votes = [];
			const { results: allVotes } = await platform?.env.DATABASE.prepare(
				`SELECT voter_id, vote FROM votes WHERE vote_id = ?`
			)
				.bind(voteId)
				.all();
			console.log(allVotes);
			return allVotes;
		}
	};
};

export default voteDB;
