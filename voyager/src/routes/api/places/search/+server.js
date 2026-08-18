import { json, error } from '@sveltejs/kit';
import { GOOGLE_PLACES_API_KEY } from '$env/static/private';

const ENDPOINT = 'https://places.googleapis.com/v1/places:searchText';
const FIELD_MASK = 'places.displayName,places.formattedAddress,places.rating';

export async function POST({ request }) {
	let body;
	try {
		body = await request.json();
	} catch {
		error(400, 'invalid JSON body');
	}

	const query = body?.query;
	if (!query || typeof query !== 'string' || !query.trim()) {
		error(400, 'query required');
	}

	const response = await fetch(ENDPOINT, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY,
			'X-Goog-Api-FieldMask': FIELD_MASK
		},
		body: JSON.stringify({
			textQuery: query.trim(),
			maxResultCount: 5
		})
	});

	if (!response.ok) {
		const text = await response.text();
		error(500, `Places API ${response.status}: ${text}`);
	}

	const data = await response.json();
	return json({ places: data.places ?? [] });
}