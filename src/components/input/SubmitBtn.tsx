import { useNavigation } from "react-router-dom"

interface SubmitBtnProps {
	text: string
	disabled?: boolean
}

const SubmitBtn = ({ text, disabled }: SubmitBtnProps) => {
	const navigation = useNavigation()

	const isSubmitting = navigation.state === "submitting"

	return (
		<button
			className="btn btn-primary btn-block"
			disabled={disabled || isSubmitting}
			type="submit"
		>
			{isSubmitting ? (
				<>
					<span className="loading loading-spinner" /> sending...
				</>
			) : (
				text || "submit"
			)}
		</button>
	)
}
export default SubmitBtn
