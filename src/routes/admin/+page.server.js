import voteKv from '$lib/vote.server';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies, platform }) {
    const auth = cookies.get('auth');
    if (auth !== 'frogmen') {
        return { records: [] };
    }
	const { results: applyResults } = await platform?.env.DATABASE.prepare(
		'SELECT * FROM party_planner_apply'
	).all();
	/** @type {ApplyRecord[]} */
	let records = applyResults;

	const {results: raptorResults} = await platform?.env.DATABASE.prepare(
		'SELECT * FROM raptors'
	).all();

	let votes = await voteKv(platform).getAllVotes();
	console.log(votes)
	return { records, votes, raptorResults };
}
