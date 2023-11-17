export const getExerciceImg = (imagePath: string) => {
	const baseUrl =
		"https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/"
	const imageFullUrl = baseUrl + imagePath

	return imageFullUrl
}
