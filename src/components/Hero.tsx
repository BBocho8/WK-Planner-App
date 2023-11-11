import { useEffect, useState } from "react"
import { GoDot } from "react-icons/go"
// import Hero1 from "../assets/images/Hero1.jpg"
// import Hero2 from "../assets/images/Hero2.jpg"
// import Hero3 from "../assets/images/Hero3.jpg"

interface HeroCarouselItemProps {
	id: number
	img: string
	header: string
	text: string
	btnText: string
	currentIndex?: number
	onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}
const handleClick = () => {
	console.log("Clicked !!!")
}
const heroItems: HeroCarouselItemProps[] = [
	{
		id: 1,
		img: "bg-hero1",
		// img: "./assets/images/Hero1.jpg",
		header: "Hello There",
		text: "// Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda // excepturi exercitationem quasi. In deleniti eaque aut repudiandae et // a id nisi. //",
		btnText: "Get Started",
	},
	{
		id: 2,
		img: "bg-hero2",
		// img: "./assets/images/Hero2.jpg",
		header: "Hello World",
		text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae libero explicabo quasi ab id quis. Atque odit deleniti quia praesentium numquam suscipit dignissimos, nam maxime necessitatibus, laudantium sequi. Modi, rerum?",
		btnText: "BUY NOW",
	},
	{
		id: 3,
		img: "bg-hero3",
		// img: "./assets/Hero3.jpg",
		header: "Hello People",
		text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque, debitis animi laboriosam, dicta perspiciatis eos magni, odit in neque tempora sunt minima ducimus! Cumque, laborum.",
		btnText: "Get your plan",
	},
]
export const HeroCarouselItem = ({
	img,
	header,
	text,
	btnText,
	onClick,
	currentIndex,
}: HeroCarouselItemProps) => {
	return (
		<div
			className="w-full carousel-item"
			style={{ transform: `translate(-${currentIndex} *100%)` }}
		>
			<div className={`min-h-screen hero ${img}`}>
				<div className="hero-overlay bg-opacity-60"></div>

				<div className="text-center hero-content text-neutral-content">
					<div className="max-w-md">
						<h1 className="mb-5 text-5xl font-bold">{header}</h1>
						<p className="mb-5">{text}</p>
						<button onClick={onClick} className="btn btn-primary">
							{btnText}
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

const Hero = () => {
	const [currentCarouselImage, setCurrentCarouselImage] = useState(0)
	const carouselInfiniteScroll = () => {
		if (currentCarouselImage === heroItems.length - 1) {
			return setCurrentCarouselImage(0)
		}
		return setCurrentCarouselImage(currentCarouselImage + 1)
	}

	const result: HeroCarouselItemProps | undefined = heroItems.find(
		(item) => item.id - 1 === currentCarouselImage
	)

	const handleButton = (item: HeroCarouselItemProps) => {
		setCurrentCarouselImage(item.id - 1)
	}

	useEffect(() => {
		const interval = setInterval(() => {
			carouselInfiniteScroll()
		}, 5000)
		return () => clearInterval(interval)
	})
	return (
		<>
			<div className="w-full h-nav-sm md:h-nav-md">
				{result && (
					<HeroCarouselItem
						id={result?.id}
						img={result?.img}
						header={result?.header}
						text={result?.text}
						btnText={result?.btnText}
						onClick={handleClick}
					/>
				)}

				<div className="absolute flex justify-center w-full gap-2 py-2 bottom-4">
					{heroItems.length > 1 &&
						heroItems.map((item) => {
							return (
								<button key={item.id} onClick={() => handleButton(item)}>
									<GoDot
										className={`  text-base-100 ${
											item.id - 1 === currentCarouselImage
												? "scale-110 w-7 h-7 "
												: "w-5 h-5"
										}`}
									/>
								</button>
							)
						})}
				</div>
			</div>
		</>
	)
}
export default Hero
