'use client'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'

import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

import { genres } from '@/utils/api/genres'

interface FilteringProps {
	genre?: string
	year?: string
	rating?: string
	setGenre?: (genre: string) => void
	setYear?: (year: string) => void
	setRating?: (rating: string) => void
}

export default function Filtering({
	genre,
	year,
	rating,
	setGenre,
	setYear,
	setRating,
}: FilteringProps) {
	const { data, isLoading, error } = useQuery({
		queryFn: genres,
		queryKey: ['genres'],
	})

	useEffect(() => {}, [genre, year, rating])

	if (isLoading) return <div>Loading...</div>
	if (error) return <div>Error: {error.message}</div>

	const handleGenreChange = (value: string) => {
		setGenre && setGenre(value)
	}

	const handleYearChange = (value: string) => {
		setYear && setYear(value)
	}

	const handleRatingChange = (value: string) => {
		setRating && setRating(value)
	}

	return (
		<div className='flex gap-x-6'>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant='secondary'
						className='flex items-end justify-start bg-zinc-800'
					>
						<div className='text-lg text-secondary'>
							{genre ? genre : 'Жанры'}
						</div>
						<ChevronDown className=' text-secondary' size={25} />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className='bg-primary border-primary px-0 overflow-scroll max-h-60'>
					{data.map((data: any) => {
						return (
							<DropdownMenuItem
								key={data.name}
								onClick={() => {
									handleGenreChange(data.name)
								}}
							>
								{data.name}
							</DropdownMenuItem>
						)
					})}
				</DropdownMenuContent>
			</DropdownMenu>

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant='secondary'
						className='flex items-end justify-start bg-zinc-800 '
					>
						<div className='text-lg text-secondary'>
							{rating ? rating : 'Рейтинг'}
						</div>
						<ChevronDown className=' text-secondary' size={25} />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className='bg-primary border-primary px-0'>
					<DropdownMenuCheckboxItem
						onClick={() => {
							handleRatingChange('7-10')
						}}
					>
						Любой рейтинг
					</DropdownMenuCheckboxItem>
					<DropdownMenuCheckboxItem
						onClick={() => {
							handleRatingChange('9-10')
						}}
					>
						Больше 9
					</DropdownMenuCheckboxItem>
					<DropdownMenuCheckboxItem
						onClick={() => {
							handleRatingChange('8-10')
						}}
					>
						Больше 8
					</DropdownMenuCheckboxItem>
					<DropdownMenuCheckboxItem
						onClick={() => {
							handleRatingChange('7-10')
						}}
					>
						Больше 7
					</DropdownMenuCheckboxItem>
					<DropdownMenuCheckboxItem
						onClick={() => {
							handleRatingChange('6-10')
						}}
					>
						Больше 6
					</DropdownMenuCheckboxItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant='secondary'
						className='flex items-end justify-start bg-zinc-800'
					>
						<div className='text-lg opacity-100 text-secondary '>
							{year ? year : 'Годы'}
						</div>
						<ChevronDown className='text-secondary' size={25} />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className='bg-primary border-primary px-0'>
					<DropdownMenuCheckboxItem
						onClick={() => {
							handleYearChange('1990-2024')
						}}
					>
						Все годы
					</DropdownMenuCheckboxItem>
					<DropdownMenuCheckboxItem
						onClick={() => {
							handleYearChange('2024')
						}}
					>
						2024
					</DropdownMenuCheckboxItem>
					<DropdownMenuCheckboxItem
						onClick={() => {
							handleYearChange('2023')
						}}
					>
						2023
					</DropdownMenuCheckboxItem>
					<DropdownMenuCheckboxItem
						onClick={() => {
							handleYearChange('2022')
						}}
					>
						2022
					</DropdownMenuCheckboxItem>
					<DropdownMenuCheckboxItem
						onClick={() => {
							handleYearChange('2021')
						}}
					>
						2021
					</DropdownMenuCheckboxItem>
					<DropdownMenuCheckboxItem
						onClick={() => {
							handleYearChange('2015-2020')
						}}
					>
						2015-2020
					</DropdownMenuCheckboxItem>
					<DropdownMenuCheckboxItem
						onClick={() => {
							handleYearChange('2010-2015')
						}}
					>
						2010-2015
					</DropdownMenuCheckboxItem>
					<DropdownMenuCheckboxItem
						onClick={() => {
							handleYearChange('2000-2010')
						}}
					>
						2000-2010
					</DropdownMenuCheckboxItem>
					<DropdownMenuCheckboxItem
						onClick={() => {
							handleYearChange('1990-2000')
						}}
					>
						1990-2000
					</DropdownMenuCheckboxItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}
