import { Exercice } from "../../types/Exercices"
import {
	getExerciceID,
	getExerciceImg,
} from "../../utils/exercices/getExerciceImg"
import { Link } from "react-router-dom"

interface ExerciceCardProps {
	exercice: Exercice
	layout: "grid" | "list"
}

export const ExerciceCard = ({ exercice, layout }: ExerciceCardProps) => {
	return (
		<>
			<div
				className={`w-full mx-auto transition duration-500 transform rounded-lg shadow-xl card bg-base-100 hover:scale-105 ${
					layout === "list" && "flex flex-row"
				}`}
			>
				{layout === "grid" ? (
					<Link to={`/exercices/${getExerciceID(exercice.id)}`}>
						<figure>
							<img
								className="object-cover object-center w-full rounded-t-md h-52"
								src={getExerciceImg(exercice.images[0])}
								alt={`${exercice.name} image`}
							/>
						</figure>
					</Link>
				) : (
					<figure className="w-[55%] rounded-r-none">
						<Link
							className="w-full"
							to={`/exercices/${getExerciceID(exercice.id)}`}
						>
							<img
								className="object-cover object-center w-full h-56 rounded-l-lg cursor-pointer"
								src={getExerciceImg(exercice.images[0])}
								alt={`${exercice.name} image`}
							/>
						</Link>
					</figure>
				)}

				<div
					className={`${
						layout === "grid"
							? "flex flex-col items-center px-8 py-4 gap-y-3"
							: "flex flex-col items-center justify-center w-[45%] px-2 py-4 gap-y-3"
					}`}
				>
					{exercice.level && (
						<div className="uppercase badge-md badge badge-primary">
							{exercice.level}
						</div>
					)}
					<Link to={`/exercices/${getExerciceID(exercice.id)}`}>
						<h2 className="flex justify-center w-full mb-0 card-title">
							<span className="text-center break-words ">{exercice.name}</span>
						</h2>
					</Link>
					<div className="flex flex-wrap justify-center gap-x-2 gap-y-2">
						{exercice.equipment && exercice.equipment !== "other" && (
							<div className="uppercase badge-md badge badge-accent">
								{exercice.equipment}
							</div>
						)}
						{exercice.force && (
							<div className="uppercase badge-md badge badge-accent">
								{exercice.force}
							</div>
						)}
						{exercice.primaryMuscles[0] && (
							<div className="uppercase badge-md badge badge-outline">
								{exercice.primaryMuscles[0]}
							</div>
						)}
						{exercice.secondaryMuscles[0] ? (
							<div className="uppercase badge-md badge badge-outline">
								{exercice.secondaryMuscles[0]}
							</div>
						) : !exercice.secondaryMuscles[0] === undefined ? (
							<div className="uppercase badge-md badge badge-outline">
								{exercice.equipment}
							</div>
						) : exercice.force ? (
							<div className="uppercase badge-md badge badge-outline">
								{exercice.category}
							</div>
						) : null}
					</div>

					<Link to={`/exercices/${getExerciceID(exercice.id)}`}>
						<button className="mt-2 rounded-md btn btn-sm btn-outline">
							See more...
						</button>
					</Link>
				</div>
			</div>
		</>
	)
}
