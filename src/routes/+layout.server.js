import { verifyAndDecodeJwt } from '$lib/auth.server';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies, url }) {
	/** @type {View | null} */
	const view = /** @type {View} */ (url.searchParams.get('view')) || 'intro';
	const applyId = cookies.get('applyId');
	const token = cookies.get('token');
	let authorized = false;
	let user = { phoneNumber: '' };
	if (token) {
		let decoded = await verifyAndDecodeJwt(token);
        if (decoded.phoneNumber) {
            user = decoded;
            authorized = true;
        }
	}
	return { applyId, view, user, authorized };
}
