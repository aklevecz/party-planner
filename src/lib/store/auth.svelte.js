import { responses } from '$lib/responses';

/**@type {AuthState} initialState */
const initialState = {
	authorized: false,
	user: { phoneNumber: '' },
	flow: null
};

const endpoints = {
	auth: 'api/auth',
};

const api = function(){
	return {
		/** AUTH */
		/** @param {string} phoneNumber */
		sendCode: async (phoneNumber) => {
			const res = await fetch(`/${endpoints.auth}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ phoneNumber })
			});
			const data = await res.json();
			return data;
		},
		/** @param {string} code */
		verifyCode: async (code) => {
			const res = await fetch(`/${endpoints.auth}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ code })
			});
			const data = await res.json();
			return data;
		},
		logout: async () => {
			const res = await fetch(`/${endpoints.auth}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const data = await res.json();
			return data;
		}
    }
}()

export function createAuth() {
	let auth = $state({ ...initialState });

	return {
		get state() {
			return auth;
		},
		/** @param {{authorized:boolean, user: {phoneNumber:string}}} data */
		init: (data) => {
			auth.authorized = data.authorized;
			auth.user = data.user;
		},
		/** @param {FlowState} flow */
		updateFlow: (flow) => {
			auth.flow = flow;
		},
		/** @param {string} phoneNumber */
		sendCode: async (phoneNumber) => {
			/** @type {{phoneNumber: string, message: Responses['CODE_SENT']}} */
			const data = await api.sendCode(phoneNumber);
			if (data.message === responses.CODE_SENT) {
				auth.user.phoneNumber = data.phoneNumber;
				auth.flow = 'code sent';
				return true;
			}
			return false;
		},
		/** @param {string} code */
		verifyCode: async (code) => {
			const data = await api.verifyCode(code);
			if (data.message === responses.AUTHED) {
				auth.authorized = true;
				return true;
			}
			return false;
		},
		logout: async () => {
			auth = initialState;
			await api.logout();
			window.location.reload();
			return true;
		}
	};
}

export default createAuth();
