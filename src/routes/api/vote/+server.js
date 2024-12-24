import { verifyAndDecodeJwt } from '$lib/auth.server';
import voteKv from '$lib/vote.server';
import { json } from '@sveltejs/kit';

/**
 * Adds HTTP headers to disable browser caching.
 *
 * The headers are as follows:
 *   - Cache-Control: no-cache, no-store, must-revalidate
 *   - Pragma: no-cache
 *   - Expires: 0
 *
 * The headers are added to the given response object.
 *
 * @param {Response} response - A Response object.
 * @returns {Response} - The response with the no-cache headers.
 */
const addNoCacheHeaders = (response) => {
	response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
	response.headers.set('Pragma', 'no-cache');
	response.headers.set('Expires', '0');
	return response;
};

/** @type {import('./$types').RequestHandler} */
export async function GET({ cookies, platform, url }) {
	const type = url.searchParams.get('type');
	const voteId = url.searchParams.get('id');

	if (!type || !voteId) {
		console.log('vote:get no type or id');
		return new Response(null, { status: 401 });
	}

	if (type === 'user') {
		const token = cookies.get('token');
		if (!token) {
			console.log('vote:get no token');
			return new Response(null, { status: 401 });
		}
		// const decoded = await verifyAndDecodeJwt(token);
		const decoded = await platform?.env.AUTH_SERVICE.authorizeToken(token);
		if (!decoded.phoneNumber) {
			console.log('vote:get no phone number');
			return new Response(null, { status: 401 });
		}
		const vote = await voteKv(platform).getUserVote({
			voteId,
			userId: decoded.phoneNumber
		});
		return addNoCacheHeaders(json(vote))
	}

    if (type === 'all') {
        const votes = await voteKv(platform).getAllVotes({voteId});
		console.log(`getAllVotes: ${JSON.stringify(votes)}`);
        return addNoCacheHeaders(json(votes.map(v => v.vote)))
    }

	console.log('vote:get unknown error');
    return new Response(null, { status: 401 });
}

export async function POST({ cookies, platform, request }) {
	const { id, option, options } = await request.json();
	const token = cookies.get('token');
	if (!token) {
		return new Response(null, { status: 401 });
	}
	// const decoded = await verifyAndDecodeJwt(token);
	const decoded = await platform?.env.AUTH_SERVICE.authorizeToken(token);
	if (!decoded.phoneNumber) {
		return new Response(null, { status: 401 });
	}
	let kv = voteKv(platform);
	// let key = `${id}:vote:${decoded.phoneNumber}`;
	// await platform?.env.PARTY_KV.put(key, option);
	console.log(`voteId: ${id}, userId: ${decoded.phoneNumber}, option: ${option}`)
	await kv.vote({ voteId: id, userId: decoded.phoneNumber, option, options });
	// let votes = [];
	// const allVotes = await platform?.env.PARTY_KV.list({ prefix: 'date:vote:' });
	// for (let i = 0; i < allVotes.keys.length; i++) {
	// 	const vote = await platform?.env.PARTY_KV.get(allVotes.keys[i].name);
	// 	votes.push(vote);
	// }
	let votes = await kv.getAllVotes({voteId: id});
	console.log(`all votes: ${JSON.stringify(votes)}`)
	const usersVote = votes.find(v => v.voter === decoded.phoneNumber);
	if (!usersVote) {
		console.log(`add in the user`)
		votes.push({ voter: decoded.phoneNumber, vote: option });
		console.log(`votes: ${JSON.stringify(votes)}`)
	}
	// return data;
	return addNoCacheHeaders(json({ success: true, votes: votes.map(v => v.vote) }))
}
