import { createJwt, verifyAndDecodeJwt } from '$lib/auth.server';
import { json } from '@sveltejs/kit';

const CURRET_EVENT = "raptor-faight-2"

/** @type {import('./$types').RequestHandler} */
export async function GET({cookies, platform, url }) {
	// const token = url.searchParams.get('id');
	// if (!token) {
		// return json(null);
	// }
	const applyToken = cookies.get('applyId');
	if (!applyToken) {
		return json(null);
	}
	const { id } = await verifyAndDecodeJwt(applyToken);
	// let { id } = await platform?.env.AUTH_SERVICE.authorizeToken(token);
	const existingRecord = await platform?.env.DATABASE.prepare(
		'SELECT * FROM party_planner_apply WHERE id = ? AND event_name = ?'
	)
		.bind(id, CURRET_EVENT)
		.first();
	return json(existingRecord);
}

export async function POST({ cookies, platform, request }) {
	const { name, email, message } = await request.json();

	try {
		await platform?.env.DATABASE.prepare(
			`
			INSERT OR REPLACE INTO party_planner_apply (name, email, message, event_name) 
			VALUES (?, ?, ?, ?)
		`
		)
			.bind(name, email, message, CURRET_EVENT)
			.run();
	} catch (/** @type {*} */ e) {
		// This is ignored currently because im allowing updates
		if (e.message.includes('D1_ERROR: UNIQUE constraint failed')) {
			return json({ success: false, message: 'You have already applied' });
		}
	}
	const checkRecord = await platform?.env.DATABASE.prepare(
		'SELECT * FROM party_planner_apply WHERE email = ? AND event_name = ?'
	)
		.bind(email, CURRET_EVENT)
		.first();

	const token = await createJwt({ id: checkRecord.id });
	await cookies.set('applyId', token, {
		path: '/'
	});
	return json({ success: true, name, email, message, id: checkRecord.id });
}

export async function DELETE({ cookies }) {
	cookies.delete('applyId', { path: '/' });
	return new Response('ok');
}
