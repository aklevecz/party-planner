const tables = {
	raptor: 'raptors'
};

const db = () => {
	return {
		/** @param {*} db @param {{phoneNumber:string}} raptor*/
		createRaptor: async (db, raptor) => {
			const randomColor = Math.floor(Math.random() * 16777215).toString(16);
			return await db
				.prepare(`INSERT INTO ${tables.raptor} (phone_number, color) VALUES (?, ?)`)
				.bind(raptor.phoneNumber, randomColor)
				.run();
		}
	};
};

export default db();
