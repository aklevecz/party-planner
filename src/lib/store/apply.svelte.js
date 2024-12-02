import { delay } from "$lib/utils";

const endpoints = {
	apply: 'api/apply'
};
const api = (function () {
	return {
		/** @param {{ name: string; email: string; message: string; }} data */
		apply: async ({ name, email, message }) => {
			const response = await fetch(endpoints.apply, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name,
					email,
					message
				})
			});
			const data = await response.json();
			return data;
		},
		getExistingRecords: async () => {
			const response = await fetch(endpoints.apply
				//  + `/?id=${id}`
				 , {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const data = await response.json();
			return data;
		},
		reset: () => {
			fetch(endpoints.apply, {
				method: 'DELETE'
			});
		}
	};
})();
const createApplyStore = () => {
	let apply = $state({ id: 0, name: '', email: '', message: '' });
	let fetching = $state(false);

	return {
		get state() {
			return apply;
		},
		/** @param {{ name: string; email: string; message: string; }} data */
		apply: async ({ name, email, message }) => {
			fetching = true;
			const data = await api.apply({
				name,
				email,
				message
			});
			const newState = { id: data.id, name: data.name, email: data.email, message: data.message };
			console.log(`newState: ${JSON.stringify(newState)}`)
			apply = newState;
			await delay(2000)
			fetching = false;
		},
		getExistingRecord: async () => {
			console.log(`Fetching existing record`);
			const data = await api.getExistingRecords();
			if (data) {
				const newState = { id: data.id, name: data.name, email: data.email, message: data.message };
				apply = newState;
			} else {
				console.log('remove cookie');
				// api.reset();
			}
		},
		reset: () => {
			api.reset();
		},
		get fetching() {
			return fetching;
		}
	};
};

export default createApplyStore();
