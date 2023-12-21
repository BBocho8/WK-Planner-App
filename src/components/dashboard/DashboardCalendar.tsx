import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar"
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay"
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"

import { Badge } from "@mui/material"
import dayjs, { Dayjs } from "dayjs"
import FormInput from "../input/FormInput"
import { toast } from "react-toastify"
import { Workout, useAuthContext } from "../../context/AuthContext"
import { setDoc } from "firebase/firestore"
import { getUserRef } from "../../utils/getUserRef"

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

export default function DashboardCalendar() {
	const { setUser, user } = useAuthContext()

	const [value, setValue] = useState<Dayjs | null>(dayjs())
	const userRef2 = getUserRef(user!.id as string)

	const sessionlogged = useMemo(
		() =>
			Object.fromEntries(
				Object.entries(user!.workouts).filter(
					(workout) => workout[0] === dayjs(value).format("DD/MM/YYYY")
				)
			),
		[value, user]
	)
	const [sessionArr, setSessionArr] = useState(sessionlogged)

	const daysToHighlight = useCallback(
		(value: Dayjs | null) =>
			Object.keys(user!.workouts)
				.filter((date) => parseInt(date.split("/")[2]) === dayjs(value).year())
				.filter(
					(date) => parseInt(date.split("/")[1]) === dayjs(value).month() + 1
				)
				.map((date) => parseInt(date.split("/")[0])),
		[user]
	)

	useEffect(() => {
		if (!user) {
			return
		} else {
			setSessionArr(sessionlogged)
			setHighlightedDays(daysToHighlight(value))
		}
	}, [user, sessionlogged, user?.workouts, value, daysToHighlight])

	const [highlightedDays, setHighlightedDays] = useState(daysToHighlight(value))

	const [currExoToAdd, setCurrExoToAdd] = useState({
		exercise: "",
		reps: 0,
		sets: 0,
	})

	const handleExoSubmit = (e: FormEvent) => {
		e.preventDefault()
		if (sessionArr[dayjs(value).format("DD/MM/YYYY")]) {
			setSessionArr({
				[dayjs(value).format("DD/MM/YYYY")]: [
					...sessionArr[dayjs(value).format("DD/MM/YYYY")],
					currExoToAdd,
				],
			})
		} else {
			setSessionArr({ [dayjs(value).format("DD/MM/YYYY")]: [currExoToAdd] })
		}

		setCurrExoToAdd({
			exercise: "",
			reps: 0,
			sets: 0,
		})
		toast.success("Exercise added successfully")
	}

	const handleAddSession = async () => {
		setHighlightedDays([...highlightedDays, dayjs(value).date()])

		setUser({
			...user!,
			workouts: {
				...user?.workouts,
				[dayjs(value).format("DD/MM/YYYY")]:
					sessionArr[dayjs(value).format("DD/MM/YYYY")],
			},
		})
		await setDoc(userRef2, {
			...user,
			workouts: {
				...user!.workouts,
				[dayjs(value).format("DD/MM/YYYY")]:
					sessionArr[dayjs(value).format("DD/MM/YYYY")],
			},
		})

		toast.success("added successfully to db")
	}

	useEffect(() => {
		console.log(user)
	}, [user])

	return (
		<>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DateCalendar
					value={value}
					onMonthChange={(newValue) => {
						setValue(newValue)
						setHighlightedDays(daysToHighlight(newValue))
						setSessionArr(
							Object.fromEntries(
								Object.entries(user!.workouts).filter(
									(workout) =>
										workout[0] === dayjs(newValue).format("DD/MM/YYYY")
								)
							)
						)
					}}
					onChange={(newValue) => {
						setValue(newValue)
						setSessionArr(
							Object.fromEntries(
								Object.entries(user!.workouts).filter(
									(workout) =>
										workout[0] === dayjs(newValue).format("DD/MM/YYYY")
								)
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
								{sessionArr[dayjs(value).format("DD/MM/YYYY")] ? (
									sessionArr[dayjs(value).format("DD/MM/YYYY")].map(
										(exo: Workout, idx: number) => {
											return (
												<tr key={(exo.exercise, idx)}>
													<th>{idx + 1}</th>
													<td>{exo.exercise}</td>
													<td>{exo.sets}</td>
													<td>{exo.reps}</td>
												</tr>
											)
										}
									)
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
