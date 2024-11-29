import { SACRET } from "$env/static/private";

var algorithm = { name: 'HMAC', hash: 'SHA-256' };

// @ts-ignore
export var getCryptoKey = async (secret) => {
	const secretBuf = typeof secret === 'string' ? new TextEncoder().encode(secret) : secret;
	return await crypto.subtle.importKey('raw', secretBuf, algorithm, false, ['sign', 'verify']);
};
/** @param {string} base64 */
const toBase64Url = (base64) => {
	return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
};

/**
 * @param {{id: string}} payload
 * @returns {Promise<string>} jwt token
 */
export async function createJwt(payload) {
	//

	// Create header
	const header = {
		alg: 'HS256',
		typ: 'JWT'
	};

	// Encode header and payload
	const encodedHeader = toBase64Url(btoa(JSON.stringify(header)));
	const encodedPayload = toBase64Url(btoa(JSON.stringify(payload)));
	const message = `${encodedHeader}.${encodedPayload}`;

	// Generate signature
	const key = await getCryptoKey(SACRET);
	const signatureBuffer = await crypto.subtle.sign(
		algorithm,
		key,
		new TextEncoder().encode(message)
	);

	// Convert signature to base64url
	const signatureArray = new Uint8Array(signatureBuffer);
	let binaryString = '';
	for (let i = 0; i < signatureArray.length; i++) {
		binaryString += String.fromCharCode(signatureArray[i]);
	}
	const signature = toBase64Url(btoa(binaryString));

	// Combine all parts
	return `${encodedHeader}.${encodedPayload}.${signature}`;
}

// @ts-ignore
var verifySignature = async (base64urlSignature, value, secret) => {
	try {
		// Convert base64url to base64
		const base64Signature = base64urlSignature
			.replace(/-/g, '+')
			.replace(/_/g, '/')
			.padEnd(Math.ceil(base64urlSignature.length / 4) * 4, '=');

		const signatureBinStr = atob(base64Signature);
		const signature = new Uint8Array(signatureBinStr.length);
		for (let i = 0; i < signatureBinStr.length; i++) signature[i] = signatureBinStr.charCodeAt(i);
		return await crypto.subtle.verify(
			algorithm,
			secret,
			signature,
			new TextEncoder().encode(value)
		);
	} catch (e) {
		console.error(e);
		return false;
	}
};

/**
 *
 * @param {string} jwt
 * @returns {Promise<{id: string}>} payload
 *  */
export var verifyAndDecodeJwt = async (jwt) => {
	const parts = jwt.split('.');
	if (parts.length !== 3) {
		throw new Error('Invalid JWT format');
	}

	const [encodedHeader, encodedPayload, signature] = parts;

	const message = `${encodedHeader}.${encodedPayload}`;
	let key = await getCryptoKey(SACRET);
	const isValid = await verifySignature(signature, message, key);

	if (!isValid) {
		throw new Error('Invalid signature');
	}

	const payload = JSON.parse(atob(encodedPayload));

	return payload;
};
