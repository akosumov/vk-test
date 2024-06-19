import axios from 'axios'

export const api = axios.create({
	baseURL: 'https://api.kinopoisk.dev',
	headers: {
		accept: 'application/json',
		'X-API-KEY': process.env.NEXT_PUBLIC_API_KEY,
	},
})
