import { api } from './api'

interface getMovieId {
	id: number
}

export const getMovie = async ({ id }: getMovieId) => {
	let url = `/v1.4/movie/${id}`

	try {
		const res = await api.get(url)

		return res.data
	} catch (error) {
		console.log(`error`, error)
		throw new Error('Failed to get movie')
	}
}
