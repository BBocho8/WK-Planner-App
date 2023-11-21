import Carousel from "react-material-ui-carousel"

import { Paper } from "@mui/material"
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md"
import { TbPointFilled } from "react-icons/tb"
import { getExerciceImg } from "../../utils/exercices/getExerciceImg"
import { Exercice } from "../../types/Exercices"

type ExerciceDetailsCarouselProps = {
	exercice: Exercice
}
const ExerciceDetailsCarousel = ({
	exercice,
}: ExerciceDetailsCarouselProps) => {
	return (
		<Carousel
			autoPlay
			cycleNavigation
			swipe
			navButtonsAlwaysVisible
			animation="slide"
			indicatorContainerProps={{
				className: "absolute bottom-2 z-[1] flex justify-center ",
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
					margin: "0 5px",
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
			{exercice.images.map((item) => (
				<Item key={exercice.id} image={item} />
			))}
		</Carousel>
	)
}
export default ExerciceDetailsCarousel

interface ItemProps {
	image: string
}

function Item({ image }: ItemProps) {
	return (
		<Paper>
			<img src={getExerciceImg(image)} alt={image} className="rounded-lg" />
		</Paper>
	)
}
