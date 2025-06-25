export default {
	async fetch(request, env) {
		if (request.method === 'OPTIONS') {
			return new Response(null, {
				status: 204,
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'POST, OPTIONS',
					'Access-Control-Allow-Headers': 'Content-Type',
				},
			});
		}

		if (request.method !== 'POST') {
			return new Response('Method Not Allowed', { status: 405 });
		}

		const contentType = request.headers.get('content-type') || '';
		let message = '';

		if (contentType.includes('application/json')) {
			const body = await request.json();
			message = body.message || 'Empty message';
		} else if (contentType.includes('application/x-www-form-urlencoded')) {
			const formText = await request.text();
			const params = new URLSearchParams(formText);

			// 🧠 Honeypot bot check
			if (params.get('website')) {
				return new Response('Bot detected', { status: 403 });
			}

			message = params.get('message') || 'Empty message';
		} else {
			return new Response('Unsupported Content-Type', { status: 415 });
		}

		const slackPayload = JSON.stringify({ text: message });

		const resp = await fetch(env.SLACK_WEBHOOK_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: slackPayload,
		});

		return new Response('Message sent to Slack!', {
			status: resp.status,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'text/plain',
			},
		});
	},
};
