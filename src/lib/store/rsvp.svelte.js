import { delay } from '$lib/utils';

const endpoints = {
	rsvp: 'api/rsvp'
};
const api = (function () {
	return {
		/** @param {{ name: string; phoneNumber: string; }} data */
		rsvp: async ({ name, phoneNumber }) => {
			const response = await fetch(endpoints.rsvp, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name,
					phoneNumber
				})
			});
			const data = await response.json();
			return data;
		},
		getExistingRecords: async () => {
			const response = await fetch(
				endpoints.rsvp,
				//  + `/?id=${id}`
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);
			const data = await response.json();
			return data;
		},
		reset: () => {
			fetch(endpoints.rsvp, {
				method: 'DELETE'
			});
		}
	};
})();
const creatersvpStore = () => {
	let rsvp = $state({ name: '', phoneNumber: '', eventName: '' });
	let fetching = $state(false);

	return {
		get state() {
			return rsvp;
		},
		/** @param {{ name: string; phoneNumber: string; }} data */
		rsvp: async ({ name, phoneNumber }) => {
			fetching = true;
			const data = await api.rsvp({
				name,
				phoneNumber
			});
			const newState = {
				name: data.name,
				phoneNumber: data.phoneNumber
			};
			rsvp = { ...rsvp, ...newState };
			await delay(2000);
			fetching = false;
		},
		getExistingRecord: async () => {
			const data = await api.getExistingRecords();
			if (data) {
				const newState = { eventName: data.event_name, phoneNumber: data.phone_number };
				rsvp = { ...rsvp, ...newState };
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

export default creatersvpStore();
