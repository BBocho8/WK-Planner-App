import { Exercice } from "../../types/Exercices"
import { Breadcrumbs } from "@mui/material"

import ExerciceDetailsCarousel from "./ExerciceDetailsCarousel"
import { FaHome } from "react-icons/fa"

type ExerciceDetailsProps = {
	exercice: Exercice
}

const ExerciceDetails = ({ exercice }: ExerciceDetailsProps) => {
	return (
		<section className="mb-10">
			<div className="my-4 ">
				<Breadcrumbs
					sx={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "start",
						alignItems: "center",
						paddingX: "16px",
						flexWrap: "wrap",
					}}
				>
					<div className="text-neutral">
						<FaHome />
					</div>
					<div className="text-xs capitalize text-neutral">Exercices</div>
					<div className="text-xs capitalize text-neutral">
						{exercice.level}
					</div>
					<div className="text-xs capitalize text-neutral">{exercice.name}</div>
				</Breadcrumbs>
			</div>

			<h3 className="my-4 text-2xl font-semibold text-center">
				{exercice.name}
			</h3>

			<div className="grid items-center justify-center mx-auto gap-y-8 ">
				<div className="w-full max-w-sm mx-auto rounded-lg shadow-md sm:max-w-xl">
					<ExerciceDetailsCarousel exercice={exercice} />
				</div>

				<div
					className={
						exercice.instructions.length > 9
							? "flex flex-col sm:flex-row gap-y-8 items-center sm:items-start justify-center sm:gap-x-4 md:gap-x-8 card-compact mx-2"
							: "flex flex-col sm:flex-row gap-y-8 items-center justify-center sm:gap-x-4 md:gap-x-8 card-compact mx-2"
					}
				>
					<div className="flex flex-col items-center justify-center w-2/5 p-4 border rounded-md shadow-md gap-y-2">
						<p className="flex flex-col items-center justify-center">
							<span className="font-semibold">Level </span>
							<span className="uppercase badge badge-primary badge-lg">
								{exercice.level}
							</span>
						</p>
						<p className="flex flex-col items-center justify-center">
							<span className="font-semibold">Muscle(s) </span>
							<div className="flex flex-col items-center gap-y-1 ">
								<span className="uppercase badge badge-primary badge-lg">
									{exercice.primaryMuscles[0]}
								</span>
								{exercice.secondaryMuscles[0] && (
									<span className="uppercase badge badge-primary badge-lg">
										{exercice.secondaryMuscles[0]}
									</span>
								)}
							</div>
						</p>
						<p className="flex flex-col items-center justify-center">
							<span className="font-semibold">Category </span>{" "}
							<span className="uppercase badge badge-primary badge-lg">
								{exercice.category}
							</span>
						</p>
						<p className="flex flex-col items-center justify-center">
							<span className="font-semibold">Force </span>{" "}
							<span className="uppercase badge badge-primary badge-lg">
								{exercice.force}
							</span>
						</p>
						<p className="flex flex-col items-center justify-center">
							<span className="font-semibold">Equipment </span>{" "}
							<span className="uppercase badge badge-primary badge-lg">
								{exercice.equipment}
							</span>
						</p>
					</div>
					<div className="p-4 mx-2 border rounded-md shadow-md sm:mx-0">
						<p className="my-3 text-xl font-semibold text-center uppercase sm:mb-2 sm:my-0 text-neutral">
							Instructions
						</p>
						<div className="flex flex-col items-start justify-center w-full gap-y-3 ">
							{exercice.instructions.map((instruction, i) => {
								return (
									<>
										<div
											key={i}
											className="flex items-center justify-start gap-x-2"
										>
											<span className=" px-1.5 font-bold rounded-lg text-base-100 bg-accent">
												{i + 1}
											</span>

											<p className="w-4/5 px-4 font-normal text-md grow">
												{instruction}
											</p>
										</div>
										{i + 1 < exercice.instructions.length && (
											<hr className="w-1/2 mx-auto border border-base-200 sm:hidden" />
										)}
									</>
								)
							})}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
export default ExerciceDetails
