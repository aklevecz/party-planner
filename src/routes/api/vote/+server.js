import { verifyAndDecodeJwt } from '$lib/auth.server';
import voteKv from '$lib/vote.server';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ cookies, platform, url }) {
	const type = url.searchParams.get('type');
	if (type === 'user') {
		const token = cookies.get('token');
		if (!token) {
			return new Response(null, { status: 401 });
		}
		const decoded = await verifyAndDecodeJwt(token);
		if (!decoded.phoneNumber) {
			return new Response(null, { status: 401 });
		}
		const vote = await voteKv(platform).getUserVote({
			voteId: 'date',
			userId: decoded.phoneNumber
		});
		return json(vote);
	}

    if (type === 'all') {
        const votes = await voteKv(platform).getAllVotes();
        return json(votes);
    }

    return new Response(null, { status: 401 });
}

export async function POST({ cookies, platform, request }) {
	const { id, option } = await request.json();
	const token = cookies.get('token');
	if (!token) {
		return new Response(null, { status: 401 });
	}
	const decoded = await verifyAndDecodeJwt(token);
	if (!decoded.phoneNumber) {
		return new Response(null, { status: 401 });
	}
	let kv = voteKv(platform);
	// let key = `${id}:vote:${decoded.phoneNumber}`;
	// await platform?.env.PARTY_KV.put(key, option);
	await kv.vote({ voteId: id, userId: decoded.phoneNumber, option });
	// let votes = [];
	// const allVotes = await platform?.env.PARTY_KV.list({ prefix: 'date:vote:' });
	// for (let i = 0; i < allVotes.keys.length; i++) {
	// 	const vote = await platform?.env.PARTY_KV.get(allVotes.keys[i].name);
	// 	votes.push(vote);
	// }
	const votes = await kv.getAllVotes();
	// return data;
	return json({ success: true, votes });
}
