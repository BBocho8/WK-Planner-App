import {
	getExerciceID,
	getExerciceImg,
} from "../utils/exercices/getExerciceImg"
import { Link } from "react-router-dom"
import { ExerciceCardProps } from "../pages/AllExercices"

export const ExerciceCard = ({ exercice, layout }: ExerciceCardProps) => {
	return (
		<>
			{layout === "grid" ? (
				<div className="w-[90%] mx-auto rounded-lg shadow-xl  grow card bg-base-100 hover:scale-105 nav-animation ">
					<figure>
						<Link to={`/exercices/${getExerciceID(exercice.id)}`}>
							<img
								className="object-cover object-center w-full max-h-60"
								src={getExerciceImg(exercice.images[0])}
								alt={`${exercice.name} image`}
							/>
						</Link>
					</figure>
					<div className="flex flex-col items-center px-8 py-4 gap-y-3">
						{exercice.level && (
							<div className="uppercase badge-md badge badge-primary">
								{exercice.level}
							</div>
						)}
						<Link to={`/exercices/${getExerciceID(exercice.id)}`}>
							<h2 className="flex justify-center w-full mb-0 card-title">
								<span className="text-center break-words ">
									{exercice.name}
								</span>
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
			) : (
				layout === "list" && (
					<div className="w-[90%] mx-auto max-w-3xl rounded-lg shadow-xl flex max-h-64 bg-base-100 hover:scale-105 nav-animation">
						<figure className="w-[55%]">
							<Link to={`/exercices/${getExerciceID(exercice.id)}`}>
								<img
									className="object-cover object-center w-full h-full rounded-l-lg cursor-pointer"
									src={getExerciceImg(exercice.images[0])}
									alt={`${exercice.name} image`}
								/>
							</Link>
						</figure>

						<div className="flex flex-col items-center justify-center w-[45%] px-2 py-4 gap-y-3">
							{exercice.level && (
								<div className="uppercase badge-md badge badge-primary">
									{exercice.level}
								</div>
							)}
							<Link to={`/exercices/${getExerciceID(exercice.id)}`}>
								<h2 className="flex justify-center w-full mb-0 cursor-pointer card-title">
									<span className="text-center break-words">
										{exercice.name}
									</span>
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
				)
			)}
		</>
	)
}
