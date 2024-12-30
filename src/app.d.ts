// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		interface Platform {
			env: {
				DATABASE: D1Database;
				PARTY_KV: KVNamespace;
				AUTH_SERVICE: any;
				MESSENGER_QUEUE: any;
			};
		}
	}
}

export {};
