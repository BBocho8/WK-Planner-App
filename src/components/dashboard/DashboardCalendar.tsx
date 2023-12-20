import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar"
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay"
import { FormEvent, useEffect, useMemo, useState } from "react"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"

import { Badge } from "@mui/material"
import dayjs, { Dayjs } from "dayjs"
import FormInput from "../input/FormInput"
import { toast } from "react-toastify"
import { User, useAuthContext } from "../../context/AuthContext"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase"

function ServerDay(
	props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }
) {
	const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props

	const isSelected =
		!props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0

	return (
		<Badge
			key={props.day.toString()}
			overlap="circular"
			badgeContent={isSelected ? "🌚" : undefined}
		>
			<PickersDay
				{...other}
				outsideCurrentMonth={outsideCurrentMonth}
				day={day}
			/>
		</Badge>
	)
}

type WorkoutSingleExercice = {
	exercise: string | undefined
	sets: number | undefined
	reps: number | string | undefined
}

type DashboardCalendarProps = {
	user: User
}

export default function DashboardCalendar({ user }: DashboardCalendarProps) {
	const { setUser } = useAuthContext()

	const userWorkoutRef = doc(db, "users", user.id)

	const [value, setValue] = useState<Dayjs | null>(dayjs())
	const sessionlogged = Object.entries(user.workouts).filter(
		(workout) => workout[0] === dayjs(value).format("DD/MM/YYYY")
	)

	const daysToHighlight = (value: Dayjs | null) =>
		Object.keys(user.workouts)
			.filter((date) => parseInt(date.split("/")[2]) === dayjs(value).year())
			.filter(
				(date) => parseInt(date.split("/")[1]) === dayjs(value).month() + 1
			)
			.map((date) => parseInt(date.split("/")[0]))

	const [highlightedDays, setHighlightedDays] = useState(daysToHighlight(value))
	console.log(highlightedDays)
	const [sessionArr, setSessionArr] = useState<WorkoutSingleExercice[]>(
		sessionlogged?.[0]?.[1]
	)

	const [currExoToAdd, setCurrExoToAdd] = useState<WorkoutSingleExercice>({
		exercise: "",
		reps: 0,
		sets: 0,
	})

	const handleExoSubmit = (e: FormEvent) => {
		e.preventDefault()
		if (sessionArr) {
			setSessionArr([...sessionArr, currExoToAdd])
		} else {
			setSessionArr([currExoToAdd])
		}

		setCurrExoToAdd({
			exercise: "",
			reps: 0,
			sets: 0,
		})
		toast.success("Exercise added successfully")

		console.log("hellooo submitted")
	}

	const handleAddSession = async () => {
		setUser({
			...user,
			workouts: {
				...user.workouts,
				[dayjs(value).format("DD/MM/YYYY")]: sessionArr,
			},
		})
		await updateDoc(userWorkoutRef, {
			workouts: {
				...user.workouts,
				[dayjs(value).format("DD/MM/YYYY")]: sessionArr,
			},
		})

		toast.success("added successfully to db")
	}

	return (
		<>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DateCalendar
					value={value}
					onMonthChange={(newValue) => {
						setValue(newValue)
						setHighlightedDays(daysToHighlight(newValue))
						setSessionArr(
							Object.entries(user.workouts).filter(
								(workout) => workout[0] === dayjs(newValue).format("DD/MM/YYYY")
							)
						)
					}}
					onChange={(newValue) => {
						setValue(newValue)
						setHighlightedDays(daysToHighlight(newValue))
						setSessionArr(
							Object.entries(user.workouts).filter(
								(workout) => workout[0] === dayjs(newValue).format("DD/MM/YYYY")
							)
						)
					}}
					views={["day", "month"]}
					slots={{
						day: ServerDay,
					}}
					slotProps={{
						day: {
							highlightedDays,
							// eslint-disable-next-line @typescript-eslint/no-explicit-any
						} as any,
					}}
				/>
			</LocalizationProvider>
			<div className="flex items-center justify-around">
				<div className="flex flex-col justify-center">
					<h2 className="mt-16 text-center">Workouts</h2>

					<div className="flex flex-col items-center justify-center max-w-lg mx-auto my-10">
						<h3>Workout - {dayjs(value).format("DD/MM/YYYY")}</h3>
						<table className="table text-center border table-zebra ">
							{/* head */}
							<thead>
								<tr>
									{sessionArr && <th></th>}
									<th>Exercise</th>
									<th>Sets</th>
									<th>Reps</th>
								</tr>
							</thead>
							<tbody>
								{sessionArr?.[0]?.[1] ? (
									sessionArr[0][1].map((exo, idx) => {
										return (
											<tr key={(exo.exercise, idx)}>
												<th>{idx + 1}</th>
												<td>{exo.exercise}</td>
												<td>{exo.sets}</td>
												<td>{exo.reps}</td>
											</tr>
										)
									})
								) : (
									<tr>
										<td className="text-sm font-medium" colSpan={4}>
											No workout found for this day...{" "}
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>
				<div>
					<form action="" onSubmit={(e) => handleExoSubmit(e)}>
						<FormInput
							name="exercise"
							id="exercise"
							label="exercise"
							type="string"
							placeholder="Enter exercise name"
							onChange={(e) =>
								setCurrExoToAdd({ ...currExoToAdd, exercise: e.target.value })
							}
							value={currExoToAdd.exercise}
						/>
						<FormInput
							name="sets"
							id="sets"
							label="sets"
							type="number"
							placeholder="Enter sets quantity"
							onChange={(e) =>
								setCurrExoToAdd({
									...currExoToAdd,
									sets: parseInt(e.target.value),
								})
							}
							value={currExoToAdd.sets}
						/>
						<FormInput
							name="reps"
							id="reps"
							label="reps"
							type="number"
							placeholder="Enter reps quantity"
							onChange={(e) =>
								setCurrExoToAdd({
									...currExoToAdd,
									reps: parseInt(e.target.value),
								})
							}
							value={currExoToAdd.reps}
						/>
						<button type="submit" className="w-full my-2 btn btn-sm">
							Add exercise...
						</button>
					</form>

					<button
						className="w-full btn btn-sm btn-primary"
						onClick={handleAddSession}
					>
						Add session to calendar...
					</button>
				</div>
			</div>
		</>
	)
}
