import { useAuthContext } from "../../context/AuthContext"
import { Exercice } from "../../types/Exercices"
import { useGetAllExercices } from "../../utils/exercices/fetchExercices"
import { getExerciceID } from "../../utils/exercices/getExerciceImg"
import { ExerciceCard } from "../exercices/ExerciceCard"

const FavoritesExercises = () => {
	const { favoriteExercises } = useAuthContext()
	const { data, isLoading, isError, error } = useGetAllExercices()

	if (isLoading) {
		return <p style={{ marginTop: "1rem " }}>Loading...</p>
	}

	if (isError) {
		console.log(error)
		return <div>something went wrong</div>
	}

	if (!favoriteExercises) {
		return <p>You don't have any favorite exercise yet...</p>
	}

	if (favoriteExercises && data) {
		const findExercise = (id: string) => {
			const exercice = data.exercices.filter(
				(exo) => getExerciceID(exo.id) === id
			)
			return exercice[0]
		}

		const favExsArr = favoriteExercises.map((exo) => findExercise(exo))

		const displayExos = (array: Exercice[]) => {
			if (array) {
				return array.map((exercice) => {
					if (exercice) {
						return (
							<ExerciceCard
								key={exercice.id}
								exercice={exercice}
								layout={"grid"}
							/>
						)
					} else return
				})
			}
		}

		return (
			<>
				<h3 className="mt-3 mb-5 text-xl font-semibold text-center">
					Favourite Exercises
				</h3>
				<div className="grid justify-center w-full gap-y-4 sm:gap-x-4 sm:gap-y-8 md:grid-cols-2 lg:grid-cols-3 ">
					{displayExos(favExsArr)}
				</div>
			</>
		)
	}
}

export default FavoritesExercises
