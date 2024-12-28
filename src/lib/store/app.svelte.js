function createAppStore() {
	/** @type {{ view: View }} */
	let app = $state({ view: 'intro' });

	return {
		get view() {
			return app.view;
		},
		/** @param {View} view */
		setView(view) {
			app.view = view;
		}
	};
}

export default createAppStore();
