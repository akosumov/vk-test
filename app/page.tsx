'use client'

import Header from '@/components/main/Header'
import Filtering from '@/components/main/Filtering'

import Image from 'next/image'

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { getMovies } from '@/utils/api/movies'

import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination'

export default function Home() {
	const [page, setIsPage] = useState(1)
	const [genre, setGenre] = useState<string | undefined>()
	const [year, setYear] = useState<string | undefined>()
	const [rating, setRating] = useState<string | undefined>()

	const router = useRouter()

	const { data, isLoading, error } = useQuery({
		queryFn: () => getMovies({ page, genre, year, rating }),
		queryKey: ['movies', page, genre, year, rating],
	})

	if (isLoading)
		return (
			<div className='bg-black text-secondary h-full text-5xl'>
				Тут должны быть скелетоны.... Загрузка
			</div>
		)
	if (error) return <div>Error: {error.message}</div>

	if (!data || data.length === 0) {
		return <div>No posts found.</div>
	}

	function truncateText(text: string, maxLength: number) {
		if (text.length > maxLength) {
			return text.slice(0, maxLength) + '...'
		} else {
			return text
		}
	}

	return (
		<div className='pt-5 pb-10 px-24 bg-white flex flex-col gap-y-8 dark:bg-black '>
			<Header />
			<Filtering
				genre={genre}
				setGenre={setGenre}
				year={year}
				setYear={setYear}
				rating={rating}
				setRating={setRating}
			/>
			{/* List of movies */}
			<div className='grid grid-cols-6 gap-x-28 gap-y-12'>
				{data.map((movie: any) => {
					return (
						<div
							className='cursor-pointer transform-none px-3 hover:scale-105 group transition-all duration-300 '
							key={movie.id}
							onClick={() => {
								router.push(`${movie.id}`)
							}}
						>
							<div className='relative'>
								{movie.poster ? (
									<Image
										src={movie.poster.url}
										alt='poster'
										width={160}
										height={250}
										className='rounded-lg group-hover:opacity-50 min-w-40 max-h-60 min-h-60'
									/>
								) : (
									<Image
										src='/bg.png'
										alt='poster'
										width={160}
										height={250}
										className='rounded group-hover:opacity-50'
									/>
								)}

								<div className='opacity-0 group-hover:opacity-100 flex flex-col gap-y-1 text-secondary absolute bottom-2 left-1 font-bold transition-all duration-300'>
									<div className='text-xs text-secondary'>
										{movie.countries ? (
											<div>{movie.countries[0].name}</div>
										) : (
											'Страна: ?'
										)}

										{movie.year ? <div>{movie.year}</div> : 'год: ?'}
									</div>
									<div className='text-lg text-green-500'>
										{movie.rating.imdb}
									</div>
								</div>
							</div>

							<div className='text-secondary font-bold group-hover:opacity-100 overflow-hidden whitespace-nowrap'>
								{movie.name ? (
									<div>{truncateText(movie.name, 15)}</div>
								) : (
									'Без названия'
								)}
							</div>
						</div>
					)
				})}
			</div>
			{/* Pagination */}
			<Pagination>
				<PaginationContent>
					<PaginationItem className='cursor-pointer'>
						<PaginationPrevious
							onClick={() => {
								setIsPage(prev => page - 1)
							}}
						/>
					</PaginationItem>
					<PaginationItem>
						<PaginationLink>{page}</PaginationLink>
					</PaginationItem>
					<PaginationItem className='cursor-pointer'>
						<PaginationNext
							onClick={() => {
								setIsPage(prev => page + 1)
							}}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	)
}
