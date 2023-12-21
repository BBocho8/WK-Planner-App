import * as React from "react"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import { HiMiniChevronRight } from "react-icons/hi2"
import { useState } from "react"
import { useAuthContext } from "../../context/AuthContext"
import { updateDoc } from "firebase/firestore"
import { toast } from "react-toastify"

import { getUserRef } from "../../utils/getUserRef"

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

type InputName = "dob" | "email" | "gender" | "height" | "name" | "weight"

type ProfileModalProps = {
	inputTitle: InputName
	icon: React.ReactNode
}

export default function ProfileModal({ inputTitle, icon }: ProfileModalProps) {
	const [open, setOpen] = React.useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)
	const [value, setValue] = useState<string | number>()
	const { setUser, user } = useAuthContext()

	if (!user) {
		return <p>Loading...</p>
	}

	const userRef2 = getUserRef(user.id as string)

	const handleChange = async (value: string | number) => {
		if (value && user[inputTitle]) {
			setUser({ ...user, [inputTitle]: value })
			await updateDoc(userRef2, {
				[inputTitle]: value,
			})
			toast.success("Name Successfully modified")
			setValue("")
		} else if (value && !user[inputTitle]) {
			setUser({ ...user, [inputTitle]: value })
			await updateDoc(userRef2, {
				[inputTitle]: value,
			})
			toast.success("Name Successfully modified")
			setValue("")
		}
	}

	return (
		<div className="flex flex-col items-center justify-between sm:flex-row gap-y-2 sm:gap-y-0">
			<div className="flex items-center justify-center gap-x-2">
				{icon}
				<span className="text-base font-light capitalize text-base-content">
					{inputTitle}
				</span>
			</div>
			<div
				className="flex items-center justify-center cursor-pointer gap-x-1"
				onClick={handleOpen}
			>
				<span
					className={`${
						user[inputTitle] && "text-sm font-medium capitalize break-words"
					} ${!user[inputTitle] && "text-xs font-light capitalize"}`}
				>
					{user[inputTitle] || "undefined"}
				</span>
				<HiMiniChevronRight className="text-xs font-light text-gray-400" />
			</div>
			<Modal
				open={open}
				onClose={() => {
					handleClose()
					setValue("")
				}}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<h3 className="text-base font-semibold tracking-normal text-center normal-case text-base-content">
						Modify your {inputTitle}
					</h3>
					{inputTitle === "gender" ? (
						<select
							className="w-full max-w-xs text-center select select-ghost"
							onChange={(e) => setValue(e.target.value)}
							defaultValue="default"
						>
							<option disabled value="default">
								Pick your gender
							</option>
							<option value="male">Male</option>
							<option value="female">Female</option>
						</select>
					) : (
						<input
							placeholder={`${
								inputTitle === "dob"
									? "dd/mm/yyyy"
									: (user[inputTitle] as string)
							}`}
							className="w-full max-w-xs text-center input input-bordered placeholder:text-center"
							type="text"
							name="name"
							id="name"
							value={value}
							onChange={(e) => setValue(e.target.value)}
						/>
					)}
					<div className="flex items-center justify-center mt-4">
						<div className="flex justify-center grow">
							<button
								onClick={() => {
									handleClose()
									setValue("")
								}}
							>
								Cancel
							</button>
						</div>
						<div className="divider divider-horizontal" />
						<div className="flex justify-center grow">
							<button
								className="font-bold text-primary"
								disabled={!value ? true : false}
								onClick={() => {
									value && handleChange(value)
									handleClose()
								}}
							>
								Confirm
							</button>
						</div>
					</div>
				</Box>
			</Modal>
		</div>
	)
}
