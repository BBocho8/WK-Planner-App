export type ExercicesApiResponse = {
	exercices: Exercice[]
}

export type Exercice = {
	name: string
	force: string
	level: string
	mechanic: string
	equipment: string
	primaryMuscles: string[]
	secondaryMuscles: string[]
	instructions: string[]
	category: string
	images: string[]
	id: string
}
