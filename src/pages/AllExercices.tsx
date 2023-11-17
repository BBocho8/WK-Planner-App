import { useQuery } from "react-query"
import customFetch from "../utils/exercices/fetchExercices"
import { Exercice, ExercicesApiResponse } from "../types/Exercices"
import { getExerciceImg } from "../utils/exercices/getExerciceImg"
import { Pagination, createTheme } from "@mui/material"
import { ThemeProvider } from "@emotion/react"

interface ExerciceCardProps {
	exercice: Exercice
}

const theme = createTheme({
	palette: {
		primary: {
			main: "#B2456E",
		},
	},
})

const ExerciceCard = ({ exercice }: ExerciceCardProps) => {
	return (
		<div className="mx-2 rounded-lg shadow-xl card w-96 bg-base-100">
			<figure>
				<img
					src={getExerciceImg(exercice.images[0])}
					alt={`${exercice.name} image`}
				/>
			</figure>
			<div className="flex flex-col items-center px-8 py-4 gap-y-3">
				{exercice.level && (
					<div className="uppercase badge-md badge badge-primary">
						{exercice.level}
					</div>
				)}
				<h2 className="mb-0 card-title">{exercice.name}</h2>
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
					{exercice.secondaryMuscles[0] && (
						<div className="uppercase badge-md badge badge-outline">
							{exercice.secondaryMuscles[0]}
						</div>
					)}
				</div>

				<button className="mt-2 rounded-md btn btn-sm btn-outline">
					See more...
				</button>
			</div>
		</div>
	)
}

const AllExercices = () => {
	const { isLoading, data, error, isError } = useQuery({
		queryKey: ["exercices"],
		queryFn: async (): Promise<ExercicesApiResponse> => {
			const { data } = await customFetch.get("/exercices")
			return data
		},
		staleTime: 60 * 5000,
	})

	if (isLoading) {
		return <p style={{ marginTop: "1rem " }}>Loading...</p>
	}

	if (isError) {
		console.log(error)
		return <div>something went wrong</div>
	}

	if (data) {
		console.log("data fetched !!!")
		console.log(data.exercices[0])
		const featuredExercices = data.exercices.slice(0, 12)
		console.log(featuredExercices)
		return (
			<>
				<h1 className="text-center">All Exercices</h1>
				<div>
					{" "}
					Filters .......
					<input
						type="search"
						name=""
						id=""
						placeholder="Enter exercice name..."
					/>
				</div>
				<div className="flex flex-wrap justify-center gap-4 mt-8">
					{featuredExercices.map((exercice) => {
						return <ExerciceCard key={exercice.id} exercice={exercice} />
					})}
				</div>
				<ThemeProvider theme={theme}>
					<Pagination
						count={8}
						size="medium"
						color="primary"
						className="flex justify-center my-8"
					/>
				</ThemeProvider>
			</>
		)
	}
}
export default AllExercices
