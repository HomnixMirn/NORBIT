'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import SnowBackground from '@/components/SnowBackground'

// Временные мок-данные, потом заменишь на данные с бэка
const COMPANIES = [
	{
		id: 1,
		name: 'TechCorp Solutions',
		description: 'Поставщик IT оборудования и услуг',
		rating: 4.8,
		reviews: 245,
		category: 'IT',
	},
	{
		id: 2,
		name: 'Premium Materials',
		description: 'Строительные и отделочные материалы',
		rating: 4.6,
		reviews: 189,
		category: 'Строительство',
	},
	{
		id: 3,
		name: 'LogisticsPro',
		description: 'Профессиональные логистические услуги',
		rating: 4.9,
		reviews: 312,
		category: 'Логистика',
	},
	{
		id: 4,
		name: 'Design Hub',
		description: 'Дизайн и брендирование услуги',
		rating: 4.7,
		reviews: 156,
		category: 'Дизайн',
	},
	{
		id: 5,
		name: 'Consulting Group',
		description: 'Бизнес консультации и аудит',
		rating: 4.5,
		reviews: 128,
		category: 'Консалтинг',
	},
	{
		id: 6,
		name: 'Quality Producers',
		description: 'Производство и экспорт товаров',
		rating: 4.8,
		reviews: 267,
		category: 'Производство',
	},
]

const CATEGORIES = [
	{ id: 1, name: 'IT & Технологии', icon: '💻' },
	{ id: 2, name: 'Строительство', icon: '🏗️' },
	{ id: 3, name: 'Логистика', icon: '📦' },
	{ id: 4, name: 'Дизайн & Маркетинг', icon: '🎨' },
	{ id: 5, name: 'Консалтинг', icon: '📊' },
	{ id: 6, name: 'Производство', icon: '⚙️' },
]

const FEATURES = [
	{
		title: 'Быстрый поиск поставщиков',
		description:
			'Опишите запрос, и система подберёт подходящих поставщиков за секунды.',
		icon: '⚡',
	},
	{
		title: 'Конкурентные предложения',
		description:
			'Получайте офферы от разных компаний и выбирайте лучшие условия.',
		icon: '💰',
	},
	{
		title: 'Безопасные сделки',
		description: 'Защищённые платежи и прозрачные условия для обеих сторон.',
		icon: '🔒',
	},
	{
		title: 'Единое пространство',
		description:
			'Все документы, переговоры и история заказов в одном интерфейсе.',
		icon: '📂',
	},
]

export default function Home() {
	const [requestText, setRequestText] = useState('')
	const [category, setCategory] = useState('')
	const [email, setEmail] = useState('')

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		// TODO: здесь будет запрос на backend
		console.log({ requestText, category, email })

		setRequestText('')
		setCategory('')
		setEmail('')
	}

	return (
		<main className='relative min-h-screen bg-[#050816] text-foreground'>
			<SnowBackground />

			{/* HERO + ФОРМА ЗАПРОСА */}
			<section className='relative z-10 py-16 sm:py-24'>
				<div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
					<div className='bg-[#0b1020]/95 border border-white/5 rounded-3xl p-8 sm:p-10 lg:p-12 shadow-[0_40px_120px_rgba(0,0,0,0.7)]'>
						<div className='max-w-3xl mx-auto text-center space-y-6'>
							<h1 className='text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white'>
								Найдите идеального поставщика
							</h1>
							<p className='text-lg sm:text-xl text-white/70'>
								Опишите свой заказ, получите предложения от проверенных компаний
								и выберите лучший вариант.
							</p>
						</div>

						{/* ФОРМА */}
						<form
							onSubmit={handleSubmit}
							className='mt-10 space-y-5 max-w-4xl mx-auto'
						>
							<div className='space-y-4'>
								<div>
									<label className='block text-sm font-medium text-white mb-2'>
										Опишите ваш запрос
									</label>
									<Textarea
										placeholder='Например: нужны поставки высокопрочного стекла для производства, объём от 1000 шт/месяц...'
										value={requestText}
										onChange={e => setRequestText(e.target.value)}
										className='min-h-28 resize-none bg-[#050816] border-white/10 text-white placeholder:text-white/30'
										required
									/>
								</div>

								<div className='grid sm:grid-cols-2 gap-4'>
									<div>
										<label className='block text-sm font-medium text-white mb-2'>
											Категория
										</label>
										<Select value={category} onValueChange={setCategory}>
											<SelectTrigger className='bg-[#050816] border-white/10 text-white'>
												<SelectValue placeholder='Выберите категорию' />
											</SelectTrigger>
											<SelectContent className='bg-[#050816] border-white/10'>
												{CATEGORIES.map(cat => (
													<SelectItem
														key={cat.id}
														value={cat.name}
														className='text-white'
													>
														{cat.icon} {cat.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>

									<div>
										<label className='block text-sm font-medium text-white mb-2'>
											Ваш Email
										</label>
										<Input
											type='email'
											placeholder='you@email.com'
											value={email}
											onChange={e => setEmail(e.target.value)}
											className='bg-[#050816] border-white/10 text-white placeholder:text-white/30'
											required
										/>
									</div>
								</div>

								<Button
									type='submit'
									className='w-full mt-2 bg-[#e11d48] hover:bg-[#fb7185] text-white text-base py-6 rounded-xl'
								>
									Создать запрос
								</Button>
							</div>

							<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-white/50 mt-4'>
								<span>✓ Запрос публикуется на площадке.</span>
								<span>✓ Компании отправляют предложения.</span>
								<span>✓ Вы выбираете лучшие условия.</span>
							</div>
						</form>
					</div>
				</div>
			</section>

			{/* КАТЕГОРИИ */}
			<section className='relative z-10 py-16 bg-[#050816]'>
				<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
					<div className='text-center mb-10'>
						<h2 className='text-3xl sm:text-4xl font-bold text-white mb-3'>
							Популярные категории
						</h2>
						<p className='text-sm sm:text-base text-white/60'>
							Выберите направление, в котором ищете поставщиков.
						</p>
					</div>

					<div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4'>
						{CATEGORIES.map(category => (
							<Link
								key={category.id}
								href={`/search?category=${encodeURIComponent(category.name)}`}
							>
								<Card className='h-32 flex flex-col items-center justify-center bg-[#0b1020] border-white/10 hover:border-[#e11d48] hover:bg-[#11172c] cursor-pointer transition-all group'>
									<div className='text-3xl mb-2 group-hover:scale-110 transition-transform'>
										{category.icon}
									</div>
									<p className='text-xs sm:text-sm font-medium text-center text-white/80 group-hover:text-white'>
										{category.name}
									</p>
								</Card>
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* КОМПАНИИ */}
			<section
				id='companies'
				className='relative z-10 py-18 sm:py-20 bg-[#070b1a]'
			>
				<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
					<div className='text-center mb-10'>
						<h2 className='text-3xl sm:text-4xl font-bold text-white mb-3'>
							Проверенные компании
						</h2>
						<p className='text-sm sm:text-base text-white/60'>
							Лучшие поставщики, готовые работать с вашим бизнесом.
						</p>
					</div>

					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
						{COMPANIES.map(company => (
							<Link key={company.id} href={`/company/${company.id}`}>
								<Card className='h-full bg-[#0b1020] border-white/10 hover:border-[#e11d48] hover:bg-[#11172c] transition-all cursor-pointer overflow-hidden flex flex-col'>
									<div className='h-20 bg-gradient-to-r from-[#e11d48]/40 via-[#fb7185]/30 to-transparent' />
									<div className='p-6 flex-1 flex flex-col space-y-3'>
										<h3 className='text-lg font-semibold text-white'>
											{company.name}
										</h3>
										<p className='text-sm text-white/70'>
											{company.description}
										</p>

										<div className='flex items-center gap-2 text-sm'>
											<span className='text-yellow-400'>★</span>
											<span className='text-white font-medium'>
												{company.rating}
											</span>
											<span className='text-white/50'>
												({company.reviews} отзывов)
											</span>
										</div>

										<Badge
											variant='outline'
											className='w-fit border-[#e11d48]/60 text-[#fb7185] mt-1'
										>
											{company.category}
										</Badge>

										<Button
											variant='outline'
											className='mt-4 w-full border-white/20 text-white hover:border-[#e11d48] hover:bg-[#e11d48]/10'
											onClick={e => {
												e.preventDefault()
												// TODO: переход к детальной странице / началу диалога
											}}
										>
											Просмотреть
										</Button>
									</div>
								</Card>
							</Link>
						))}
					</div>

					<div className='text-center mt-10'>
						<Button
							variant='outline'
							size='lg'
							className='px-8 border-white/30 text-white hover:border-[#e11d48] hover:bg-[#e11d48]/10'
						>
							Смотреть все компании →
						</Button>
					</div>
				</div>
			</section>

			{/* ПРЕИМУЩЕСТВА */}
			<section id='about' className='relative z-10 py-18 sm:py-20 bg-[#050816]'>
				<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
					<div className='text-center mb-10'>
						<h2 className='text-3xl sm:text-4xl font-bold text-white mb-3'>
							Почему NORBIT?
						</h2>
						<p className='text-sm sm:text-base text-white/60 max-w-2xl mx-auto'>
							Платформа, которая объединяет компании и поставщиков в одном
							прозрачном и удобном цифровом пространстве.
						</p>
					</div>

					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
						{FEATURES.map((feature, index) => (
							<Card
								key={index}
								className='bg-[#0b1020] border-white/10 p-6 flex flex-col gap-3'
							>
								<div className='text-3xl'>{feature.icon}</div>
								<h3 className='text-base sm:text-lg font-semibold text-white'>
									{feature.title}
								</h3>
								<p className='text-sm text-white/70'>{feature.description}</p>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* СТАТИСТИКА */}
			<section className='relative z-10 py-14 border-y border-white/10 bg-[#070b1a]'>
				<div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
					<div className='grid grid-cols-3 gap-6 text-center'>
						<div>
							<div className='text-3xl sm:text-4xl font-bold text-[#fb7185] mb-1'>
								500+
							</div>
							<p className='text-xs sm:text-sm text-white/70'>Компаний</p>
						</div>
						<div>
							<div className='text-3xl sm:text-4xl font-bold text-[#fb7185] mb-1'>
								10K+
							</div>
							<p className='text-xs sm:text-sm text-white/70'>
								Размещённых заказов
							</p>
						</div>
						<div>
							<div className='text-3xl sm:text-4xl font-bold text-[#fb7185] mb-1'>
								4.7★
							</div>
							<p className='text-xs sm:text-sm text-white/70'>
								Средний рейтинг платформы
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className='relative z-10 py-18 sm:py-20 bg-[#050816]'>
				<div className='mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center'>
					<h2 className='text-3xl sm:text-4xl font-bold text-white mb-4'>
						Готовы разместить первый запрос?
					</h2>
					<p className='text-sm sm:text-lg text-white/70 mb-8 max-w-2xl mx-auto'>
						Опишите потребность в пару предложений — и в течение 24 часов вы
						получите предложения от заинтересованных поставщиков.
					</p>
					<Button
						size='lg'
						className='bg-[#e11d48] hover:bg-[#fb7185] text-white px-8 py-6 text-base rounded-xl'
						onClick={() => {
							document
								.querySelector('form')
								?.scrollIntoView({ behavior: 'smooth' })
						}}
					>
						Создать запрос
					</Button>
				</div>
			</section>

			{/* ФУТЕР */}
			<footer className='relative z-10 border-t border-white/10 bg-[#050816] py-10'>
				<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
					<div className='grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8 text-sm'>
						<div>
							<h4 className='font-semibold text-white mb-3'>NORBIT</h4>
							<ul className='space-y-2 text-white/60'>
								<li>
									<Link href='#' className='hover:text-white transition'>
										О платформе
									</Link>
								</li>
								<li>
									<Link href='#' className='hover:text-white transition'>
										Блог
									</Link>
								</li>
								<li>
									<Link href='#' className='hover:text-white transition'>
										Карьера
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h4 className='font-semibold text-white mb-3'>Для покупателей</h4>
							<ul className='space-y-2 text-white/60'>
								<li>
									<Link href='#' className='hover:text-white transition'>
										Как это работает
									</Link>
								</li>
								<li>
									<Link href='#' className='hover:text-white transition'>
										Условия
									</Link>
								</li>
								<li>
									<Link href='#' className='hover:text-white transition'>
										FAQ
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h4 className='font-semibold text-white mb-3'>Для поставщиков</h4>
							<ul className='space-y-2 text-white/60'>
								<li>
									<Link href='#' className='hover:text-white transition'>
										Присоединиться
									</Link>
								</li>
								<li>
									<Link href='#' className='hover:text-white transition'>
										Преимущества
									</Link>
								</li>
								<li>
									<Link href='#' className='hover:text-white transition'>
										Поддержка
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h4 className='font-semibold text-white mb-3'>Контакты</h4>
							<ul className='space-y-2 text-white/60'>
								<li>support@norbit.com</li>
								<li>+7 (999) 999-99-99</li>
								<li>Москва, Россия</li>
							</ul>
						</div>
					</div>

					<div className='border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-white/50 gap-3'>
						<p>© 2025 NORBIT. Все права защищены.</p>
						<div className='flex gap-6'>
							<Link href='#' className='hover:text-white transition'>
								Политика конфиденциальности
							</Link>
							<Link href='#' className='hover:text-white transition'>
								Условия использования
							</Link>
						</div>
					</div>
				</div>
			</footer>
		</main>
	)
}
