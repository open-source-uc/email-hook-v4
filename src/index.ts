/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx): Promise<Response> {
		return new Response("Hola mundo!");
	},
	async email(message, env, ctx) {
		await env.DB
			.prepare(`
			INSERT OR REPLACE INTO verification_codes (email) VALUES (?)`)
			.bind(message.from.split("@")[0])
			.run();
	},
	async scheduled(controller, env, ctx) {
		try {
			await env.DB
				.prepare(`
				DELETE FROM verification_codes 
				WHERE created_at < datetime('now', '-2 days')`)
				.run();
		} catch (error) {
			console.error('Error during cleanup:', error);
		}
	}

} satisfies ExportedHandler<Env>;
