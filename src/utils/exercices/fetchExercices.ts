import axios from "axios"
import { ExercicesApiResponse } from "../../types/Exercices"
import { useQuery } from "react-query"

export const customFetch = axios.create({
	baseURL: "https://sge-db.sge-db.workers.dev",
})

export const useGetAllExercices = () => {
	const { isLoading, data, error, isError } = useQuery({
		queryKey: ["exercices"],
		queryFn: async (): Promise<ExercicesApiResponse> => {
			const { data } = await customFetch.get("/exercices")
			return data
		},
		staleTime: 60 * 5000,
	})

	return { isLoading, data, isError, error }
}
