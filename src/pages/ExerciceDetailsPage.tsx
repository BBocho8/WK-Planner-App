import { useParams } from "react-router-dom"
import ExerciceDetails from "../components/exercices/ExerciceDetails"
import { useGetAllExercices } from "../utils/exercices/fetchExercices"
import { getExerciceID } from "../utils/exercices/getExerciceImg"

const ExerciceDetailsPage = () => {
	const { data, isLoading, isError, error } = useGetAllExercices()

	const { exerciceID } = useParams()

	if (isLoading) {
		return <p style={{ marginTop: "1rem " }}>Loading...</p>
	}

	if (isError) {
		console.log(error)
		return <div>something went wrong</div>
	}

	if (data) {
		const exercice = data.exercices.find(
			(exo) => getExerciceID(exo.id) === exerciceID
		)
		return (
			<section className="max-w-3xl mx-auto">
				{exercice && <ExerciceDetails exercice={exercice} />}
			</section>
		)
	}
}
export default ExerciceDetailsPage
