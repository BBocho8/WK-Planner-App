import * as React from "react"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"

import { TiDelete } from "react-icons/ti"

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
}

type BasicModalProps = {
	deleteExercise: (exercise: string) => void
	exercise: string
}

export default function DeleteExerciseModal({
	deleteExercise,
	exercise,
}: BasicModalProps) {
	const [open, setOpen] = React.useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	return (
		<div>
			<button
				type="button"
				onClick={handleOpen}
				className="flex items-center justify-center"
				title="Delete exercise"
			>
				<TiDelete className="text-xl" />
			</button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<p className="mb-4 text-lg font-medium text-center">
						Are you sure you want to remove this exercise from the session ?
					</p>
					<span className="block text-xl font-semibold text-center text-accent">
						{exercise}
					</span>
					<div className="flex justify-center mt-4 gap-x-3">
						<button
							className="border btn btn-sm btn-ghost border-base-content "
							onClick={() => setOpen(false)}
						>
							NO - Back to Workout Page
						</button>

						<button
							className="btn btn-sm btn-primary "
							onClick={() => deleteExercise(exercise)}
						>
							YES - REMove
						</button>
					</div>
				</Box>
			</Modal>
		</div>
	)
}
