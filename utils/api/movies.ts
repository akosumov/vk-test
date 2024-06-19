import { api } from '@/utils/api/api'

interface getMoviesParams {
	page: number
	genre?: string | undefined
	year?: string | undefined
	rating?: string | undefined
}

export const getMovies = async ({
	page = 1,
	genre,
	year = '1990-2024',
	rating = '7-10',
}: getMoviesParams) => {
	let url = `/v1.4/movie?page=${page}&limit=50&year=${year}&rating.imdb=${rating}`

	if (genre) {
		url += `&genres.name=${genre}`
	}

	try {
		const res = await api.get(url)
		return res.data.docs
	} catch (error) {
		console.log(`error`, error)
		throw new Error('Failed to get movies')
	}
}
