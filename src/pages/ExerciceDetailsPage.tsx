import { Link, useParams } from "react-router-dom"
import ExerciceDetails from "../components/exercices/ExerciceDetails"
import { useGetAllExercices } from "../utils/exercices/fetchExercices"
import { getExerciceID } from "../utils/exercices/getExerciceImg"
import { useAuthContext } from "../context/AuthContext"
import { updateDoc, arrayRemove, arrayUnion } from "firebase/firestore"

import { toast } from "react-toastify"
import { getUserRef } from "../utils/getUserRef"
import { useEffect } from "react"

const ExerciceDetailsPage = () => {
	const { exerciceID } = useParams()
	const { data, isLoading, isError, error } = useGetAllExercices()
	const {
		authUser,
		user,
		setUser,
		favoriteExercises,
		refID,
		setIsFavorite,
		isFavorite,
	} = useAuthContext()

	useEffect(() => {
		if (!favoriteExercises) {
			return
		} else if (favoriteExercises) {
			setIsFavorite(
				favoriteExercises?.some((exo) => exo === exerciceID) ? true : false
			)
		}
	}, [favoriteExercises, exerciceID, setIsFavorite])

	console.log(isFavorite)
	if (!authUser || !user || !refID || !exerciceID) {
		return (
			<p className="mt-4 text-center">
				Please{" "}
				<Link to="/login" className="font-semibold text-primary">
					Login
				</Link>{" "}
				or{" "}
				<Link to="/register" className="font-semibold text-primary">
					Register
				</Link>{" "}
				to see this page.
			</p>
		)
	}

	if (isLoading) {
		return <p style={{ marginTop: "1rem " }}>Loading...</p>
	}

	if (isError) {
		console.log(error)
		return <div>something went wrong</div>
	}

	if (data) {
		const userRef2 = getUserRef(refID)

		const handleFavorite = async () => {
			if (isFavorite) {
				setUser({
					...user,
					favoriteExercises: user.favoriteExercises?.filter(
						(exo) => exo !== exerciceID
					) as string[],
				})
				await updateDoc(userRef2, {
					favoriteExercises: arrayRemove(exerciceID),
				})
				setIsFavorite(false)
				toast.success("Successfully removed from favs")
			} else {
				setUser({ ...user, favoriteExercises })

				await updateDoc(userRef2, {
					favoriteExercises: arrayUnion(exerciceID),
				})
				setIsFavorite(true)

				toast.success("Successfully added to favs")
			}
		}
		const exercice = data.exercices.find(
			(exo) => getExerciceID(exo.id) === exerciceID
		)

		return (
			<div className="max-w-3xl mx-auto">
				{exercice && (
					<ExerciceDetails
						isFavorite={isFavorite}
						exercice={exercice}
						handleFavorite={handleFavorite}
					/>
				)}
			</div>
		)
	}
}
export default ExerciceDetailsPage
