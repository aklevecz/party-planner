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
		/** @param {string} id */
		getExistingRecords: async (id) => {
			const response = await fetch(endpoints.apply + `/?id=${id}`, {
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
	let { id, name, email, message } = apply;

	return {
		get state() {
			return apply;
		},
		/** @param {{ name: string; email: string; message: string; }} data */
		apply: async ({ name, email, message }) => {
			const data = await api.apply({
				name,
				email,
				message
			});
			const newState = { id: data.id, name: data.name, email: data.email, message: data.message };
			apply = newState;
		},
		/** @param {string} existingRecordId */
		getExistingRecord: async (existingRecordId) => {
			const data = await api.getExistingRecords(existingRecordId);
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
		}
	};
};

export default createApplyStore();
