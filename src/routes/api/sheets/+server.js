import { SHEETS_TOKEN } from '$env/static/private';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({request,platform}) {
    const authorization = request.headers.get('authorization');
    if (authorization !== SHEETS_TOKEN) {
        return new Response(null, { status: 401 });
    }
	const { results: applyResults } = await platform?.env.DATABASE.prepare(
		'SELECT * FROM party_planner_apply'
	).all();
    return json(applyResults);
}
