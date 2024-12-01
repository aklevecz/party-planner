/** @param {*} platform */
const voteKv = (platform) => {
	return {
		/** @param {{voteId:string, userId:string, option:string}} props */
		vote: async ({ voteId, userId, option }) => {
			let key = `${voteId}:vote:${userId}`;
			await platform?.env.PARTY_KV.put(key, option);
		},
		/** @param {{voteId:string, userId:string}} props */
		getUserVote: async ({ voteId, userId }) => {
			return await platform?.env.PARTY_KV.get(`${voteId}:vote:${userId}`);
		},
		/** @param {{voteId:string}} props */
		getAllVotes: async ({ voteId }) => {
			/** @type {{voter: string, vote: string}[]} */
			let votes = [];
			const allVotes = await platform?.env.PARTY_KV.list({ prefix: `${voteId}:vote:` });
			for (let i = 0; i < allVotes.keys.length; i++) {
				let key = allVotes.keys[i].name;
				const vote = await platform?.env.PARTY_KV.get(allVotes.keys[i].name);
				votes.push({ voter: key.split(':vote:').pop(), vote });
			}
			return votes;
		}
	};
};

export default voteKv;
