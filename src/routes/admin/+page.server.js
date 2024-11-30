/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies, platform }) {
    const auth = cookies.get('auth');
    if (auth !== 'frogmen') {
        return { records: [] };
    }
	const { results } = await platform?.env.DATABASE.prepare(
		'SELECT * FROM party_planner_apply'
	).all();
	/** @type {ApplyRecord[]} */
	let records = results;
	return { records };
}
