import { useState } from 'react'

import Image from 'next/image'

import { cn } from '@/lib/utils'

export default function Header() {
	const [isActive, setIsActive] = useState<boolean>(false)

	return (
		<>
			<div className='flex gap-x-5 justify-between items-start'>
				<Image
					src='/vk.png'
					height={40}
					width={40}
					alt='logo'
					className='dark:hidden'
				/>
				<Image
					src='/vk-dark.png'
					height={40}
					width={40}
					alt='logo'
					className='hidden dark:block'
				/>
			</div>

			<div className='max-w-3xl flex flex-col gap-y-2 items-start'>
				<h1 className='text-5xl font-bold  text-secondary'>Фильмы</h1>
				<p
					className={cn(
						'text-secondary opacity-80 text-lg overflow-hidden h-7',
						isActive && 'overflow-auto h-full'
					)}
				>
					Вы любите смотреть фильмы онлайн и проводите много времени, прочесывая
					сайты в поисках чего-нибудь интересного? Стоит задержаться на
					vk.movies – фильмов, которые собраны у нас, вам хватит надолго.
					Коллекция постоянно пополняется как новыми фильмами, так и признанными
					шедеврами прошлых лет! Независимо от того, кто вы – любитель
					энергичных боевиков или поклонница молодежных сериалов, изобилие
					нашего каталога заставит вас забыть обо всех других способах
					проведения досуга, и вы будете пересматривать любимые фильмы онлайн
					снова и снова!
				</p>
				{!isActive && (
					<p
						className='text-violet-600 cursor-pointer'
						onClick={() => {
							setIsActive(true)
						}}
					>
						Читать все
					</p>
				)}
			</div>
		</>
	)
}
