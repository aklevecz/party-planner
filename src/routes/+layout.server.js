import { verifyAndDecodeJwt } from '$lib/auth.server';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies, platform, url }) {
	/** @type {View | null} */
	const view = /** @type {View} */ (url.searchParams.get('view')) || 'intro';
	const applyId = cookies.get('applyId');
	const token = cookies.get('token');
	let authorized = false;
	let user = { phoneNumber: '' };
	if (token) {
		// let decoded = await verifyAndDecodeJwt(token);
		try {
			let decoded = await platform?.env.AUTH_SERVICE.authorizeToken(token);
			if (decoded.phoneNumber) {
				user = decoded;
				authorized = true;
			}
		} catch (e) {
			cookies.delete('token', { path: '/' });
		}
	}
	return { applyId, view, user, authorized };
}
