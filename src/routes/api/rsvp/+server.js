import { createJwt, verifyAndDecodeJwt } from '$lib/auth.server';
import { hashPhoneNumber } from '$lib/utils';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ cookies, platform, url }) {
	// const token = url.searchParams.get('id');
	// if (!token) {
	// return json(null);
	// }
	const rsvpId = cookies.get('rsvpId');
	if (!rsvpId) {
		return json(null);
	}
	const phoneNumber = await platform?.env.PARTY_KV.get(`faight:rsvp:${rsvpId}`);
	// let { id } = await platform?.env.AUTH_SERVICE.authorizeToken(token);
	const existingRecord = await platform?.env.DATABASE.prepare(
		'SELECT * FROM raptor_rsvps WHERE phone_number = ?'
	)
		.bind(phoneNumber)
		.first();
	return json(existingRecord);
}

export async function POST({ cookies, platform, request }) {
	const { name, phoneNumber } = await request.json();
	try {
		await platform?.env.DATABASE.prepare(
			`
			INSERT OR REPLACE INTO raptor_rsvps (name, phone_number, event_name) 
			VALUES (?, ?, ?)
		`
		)
			.bind(name, phoneNumber, 'faight')
			.run();
	} catch (/** @type {*} */ e) {
		// This is ignored currently because im allowing updates
		if (e.message.includes('D1_ERROR: UNIQUE constraint failed')) {
			return json({ success: false, message: 'You have already applied' });
		}
	}

	const token = hashPhoneNumber(phoneNumber);
	await cookies.set('rsvpId', token, {
		path: '/'
	});

	const kvKey = `faight:rsvp:${token}`;
	const existingRsvp = await platform?.env.PARTY_KV.get(kvKey);

	if (existingRsvp) {
		console.log("THERE IS EXISTING RSVP")
	}
	if (!existingRsvp) {
		console.log("CREATING NEW RSVP")
		await platform?.env.PARTY_KV.put(kvKey, phoneNumber);
		const message = `hi ${name?.split(' ')[0]}! you are signed up to receive updates about the party @ The Faight on February 8th`;

		await platform?.env.MESSENGER_QUEUE.send({ contextMessage: message, phoneNumber });
		console.log(`sent message ${message} to ${phoneNumber}`);
		// const tempHeaderAuth = {
		// 	'z-auth': 'x-chicken-x'
		// };
		// const endpoint = 'https://los.baos.haus/messaging/send';
		// await fetch(endpoint, {
		// 	method: 'POST',
		// 	headers: tempHeaderAuth,
		// 	body: JSON.stringify({
		// 		message,
		// 		firstName: name?.split(' ')[0],
		// 		phoneNumber
		// 	})
		// });
	}
	return json({ success: true, name, id: token });
}

export async function DELETE({ cookies }) {
	cookies.delete('rsvpId', { path: '/' });
	return new Response('ok');
}
