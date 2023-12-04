import * as React from "react"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import {
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material"
import { LuLogOut } from "react-icons/lu"

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
	isOpen: boolean
	userSignOut: () => void
}

export default function BasicModal({ isOpen, userSignOut }: BasicModalProps) {
	const [open, setOpen] = React.useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	return (
		<ListItem disablePadding sx={{ display: "block" }}>
			<ListItemButton
				title="Sign Out"
				onClick={handleOpen}
				sx={{
					minHeight: 48,
					justifyContent: isOpen ? "initial" : "center",
					px: 2.5,
				}}
			>
				<ListItemIcon
					sx={{
						minWidth: 0,
						mr: isOpen ? 3 : "auto",
						justifyContent: "center",
					}}
				>
					<LuLogOut />
				</ListItemIcon>
				<ListItemText primary="Sign Out" sx={{ opacity: isOpen ? 1 : 0 }} />
			</ListItemButton>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<p className="mb-4 text-lg font-medium text-center">
						Are you sure you want to sign out ?
					</p>
					<div className="flex justify-center gap-x-3">
						<button
							className="border btn btn-sm btn-ghost border-base-content "
							onClick={() => setOpen(false)}
						>
							NO - Back to Dashboard
						</button>
						<button className="btn btn-sm btn-primary " onClick={userSignOut}>
							YES - Sign Out
						</button>
					</div>
				</Box>
			</Modal>
		</ListItem>
	)
}
