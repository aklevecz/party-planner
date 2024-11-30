const api = function () {
    return {
        /** @param {string} id @param {string} option */
        vote: async (id, option) => {
            const response = await fetch('/api/vote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id,
                    option
                })
            });
            const data = await response.json();
            return data;
        }
    };
}();


/**
 * @param {string} id
 * @param {Record<string, number>} options
 */
const createVoteStore = (id, options) => {
	let vote = $state({ id, options });

	return {
		get state() {
			return vote;
		},
        /** @param {string} option */
		vote: async (option) => {
			const data = await api.vote(id, option);
			vote = data;
		}
	};
};

export const dateVote = createVoteStore('date', {
	'2025-01-01': 0,
	'2025-01-13': 0,
	'2025-01-26': 0
});
