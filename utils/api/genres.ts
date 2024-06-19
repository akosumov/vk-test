import { api } from './api'

export const genres = async () => {
	let url =
		'https://api.kinopoisk.dev/v1/movie/possible-values-by-field?field=genres.name'

	try {
		const res = await api.get(url)
		return res.data
	} catch (error) {
		console.log('error', error)
		throw new Error('Failed to get genres')
	}
}
