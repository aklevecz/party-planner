/** @param {*} platform */
const voteKv = (platform) => {
	return {
		/** @param {{voteId:string, userId:string, option:string, options:Options}} props */
		vote: async ({ voteId, userId, option, options }) => {
			let key = `${voteId}:vote:${userId}`;
			if (options.multipleVotes === false) {
				await platform?.env.PARTY_KV.put(key, option);
			} else {
				let votes = JSON.parse((await platform?.env.PARTY_KV.get(key) || '[]'));
				if (!votes.includes(option)) {
					votes.push(option);
				} else {
					votes.splice(votes.indexOf(option), 1);
				}
				await platform?.env.PARTY_KV.put(key, JSON.stringify(votes));
			}
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
