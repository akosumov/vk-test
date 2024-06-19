'use client'

import { getMovie } from '@/utils/api/movie'

import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

import Image from 'next/image'

export default function MovieInformation({
	params,
}: {
	params: { movie: string }
}) {
	const id = +params.movie

	const { data, isLoading, error } = useQuery({
		queryFn: () => getMovie({ id }),
		queryKey: ['movie', id],
	})
	const router = useRouter()

	if (isLoading) return <div>Loading...</div>
	if (error) return <div>Error: {error.message}</div>

	console.log(data)
	return (
		<div className='bg-black h-full p-10'>
			<div className='flex items-start gap-5'>
				{data.poster ? (
					<Image
						src={data.poster.url}
						alt='poster'
						width={360}
						height={550}
						className='rounded-lg group-hover:opacity-50 0'
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
				<div className='flex flex-col  items-start text-secondary'>
					<div className=' text-7xl'>
						{data.name ? data.name : 'Без названия'}
					</div>
					<div className=' text-3xl'>
						{data.description ? data.description : 'Описания нету'}
					</div>
					<div className='text-2xl'>
						Дата выхода: {data.year ? data.year : 'Неизвестно'}
					</div>
					<div className='text-2xl text-green-500'>{data.rating.imdb}</div>
					<div>
						Жанр:
						{data.genres.map((genre: any) => {
							return <> {genre.name} </>
						})}
					</div>
					<Button
						variant='outline'
						className='text-black'
						onClick={() => {
							router.back()
						}}
					>
						Вернуть назад
					</Button>
				</div>
			</div>
		</div>
	)
}
