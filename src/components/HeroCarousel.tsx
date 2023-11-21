import { MdNavigateBefore, MdNavigateNext } from "react-icons/md"
import { TbPointFilled } from "react-icons/tb"
import img1 from "../assets/images/Hero1.jpg"
import img2 from "../assets/images/Hero2.jpg"
import img3 from "../assets/images/Hero3.jpg"
import Carousel from "react-material-ui-carousel"

interface HeroCarouselItemProps {
	id: number
	img: string
	header: string
	text: string
	btnText: string
	currentIndex?: number
}

const heroItems: HeroCarouselItemProps[] = [
	{
		id: 1,
		img: img1,

		header: "Hello There",
		text: "// Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda // excepturi exercitationem quasi. In deleniti eaque aut repudiandae et // a id nisi. //",
		btnText: "Get Started",
	},
	{
		id: 2,
		img: img2,

		header: "Hello World",
		text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae libero explicabo quasi ab id quis. Atque odit deleniti quia praesentium numquam suscipit dignissimos, nam maxime necessitatibus, laudantium sequi. Modi, rerum?",
		btnText: "BUY NOW",
	},
	{
		id: 3,
		img: img3,

		header: "Hello People",
		text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque, debitis animi laboriosam, dicta perspiciatis eos magni, odit in neque tempora sunt minima ducimus! Cumque, laborum.",
		btnText: "Get your plan",
	},
]

const handleClick = () => {
	console.log("Clicked !!!")
}

const HeroCarousel = () => {
	return (
		<Carousel
			autoPlay
			cycleNavigation
			swipe
			navButtonsAlwaysVisible
			animation="slide"
			indicatorContainerProps={{
				className: "absolute bottom-6 z-[1] flex justify-center ",
			}}
			activeIndicatorIconButtonProps={{
				style: { color: "#B2456E", scale: "1.25" },
			}}
			indicatorIconButtonProps={{
				style: {
					color: "#f5f5f4",
				},
			}}
			navButtonsProps={{
				style: {
					margin: "0 0",
					position: "relative",
					backgroundColor: "transparent",
					top: "calc(50% - 20px) !important",
					color: "white",
					fontSize: "30px",

					transition: "200ms",
					cursor: "pointer",
				},
			}}
			NextIcon={
				<MdNavigateNext className="w-12 h-12 text-base-100 hover:text-primary" />
			}
			PrevIcon={
				<MdNavigateBefore className="w-12 h-12 text-base-100 hover:text-primary" />
			}
			IndicatorIcon={<TbPointFilled className="w-5 h-5 " />}
			fullHeightHover={false}
		>
			{heroItems.map((hero) => {
				return (
					<Item
						key={hero.id}
						image={hero.img}
						header={hero.header}
						text={hero.text}
						btnText={hero.btnText}
						onClick={handleClick}
					/>
				)
			})}
		</Carousel>
	)
}
export default HeroCarousel

interface ItemProps {
	image: string
	header: string
	text: string
	btnText: string
	onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

function Item({ image, header, text, onClick, btnText }: ItemProps) {
	return (
		<div className="relative flex items-center justify-center w-full">
			<img
				src={image}
				alt={image}
				className="object-cover object-center w-full h-nav-sm md:h-nav-md brightness-75"
			/>

			<div className="absolute max-w-[14rem] text-center text-neutral-content sm:max-w-lg">
				<div className="max-w-md">
					<h1 className="mb-5 text-5xl font-bold">{header}</h1>
					<p className="mb-5">{text}</p>
					<button onClick={onClick} className="btn btn-primary">
						{btnText}
					</button>
				</div>
			</div>
		</div>
	)
}
