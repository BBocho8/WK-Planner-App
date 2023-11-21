import { Exercice } from "../../types/Exercices"

export const getFilteredItems = (query: string, exercices: Exercice[]) => {
	if (!query) {
		return exercices
	}
	if (query.length > 2) {
		return exercices.filter((game) =>
			game.name.toLowerCase().includes(query.toLowerCase())
		)
	}
}
