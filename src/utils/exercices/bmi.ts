// Height must be in CM and Weight in KG

export const calculateBMI = (height: number, weight: number) => {
	let result

	if (!height || isNaN(height)) {
		throw new Error("Provide a valid Height!")
	} else if (!weight || isNaN(weight)) {
		throw new Error("Provide a valid Weight!")
	} else {
		const bmi = parseFloat((weight / ((height * height) / 10000)).toFixed(2))
		if (bmi < 18.6) {
			result = "Under Weight"
		} else if (bmi >= 18.6 && bmi < 24.9) {
			result = "Normal"
		} else result = "Over Weight"

		return { bmi, result }
	}
}
