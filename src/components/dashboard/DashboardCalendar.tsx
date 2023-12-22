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
import { FaCircleCheck } from "react-icons/fa6"
import DeleteExerciseModal from "./DeleteExerciseModal"

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
			badgeContent={
				isSelected ? <FaCircleCheck className="text-accent" /> : undefined
			}
		>
			<PickersDay
				{...other}
				outsideCurrentMonth={outsideCurrentMonth}
				day={day}
				// className={isSelected ? "bg-black" : "bg-white"}
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
				.filter((date) => user!.workouts[date].length > 0)
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

	const [currExoToAdd, setCurrExoToAdd] = useState<Workout>({
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

	const deleteExercise = async (exo: string) => {
		setUser({
			...user!,
			workouts: {
				...user?.workouts,
				[dayjs(value).format("DD/MM/YYYY")]: sessionArr[
					dayjs(value).format("DD/MM/YYYY")
				].filter((session) => session.exercise !== exo),
			},
		})
	}

	return (
		<>
			<h2 className="my-8 font-semibold text-center">Workouts Calendar</h2>
			<section className="grid items-center justify-center md:grid-cols-2 md:max-w-3xl md:mx-auto ">
				<div className="md:col-span-2">
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
				</div>
				<div className="flex flex-col justify-center max-w-xs mx-auto">
					<div className="flex flex-col items-center justify-center max-w-lg mx-auto my-10">
						<h3 className="font-medium">
							Workout - {dayjs(value).format("DD/MM/YYYY")}
						</h3>
						<table className="table text-center border table-md md:table-lg table-zebra ">
							{/* head */}
							<thead>
								<tr>
									{sessionArr && <th></th>}
									<th>Exercise</th>
									<th>Sets</th>
									<th>Reps</th>
									{sessionArr && <th></th>}
								</tr>
							</thead>
							<tbody>
								{sessionArr[dayjs(value).format("DD/MM/YYYY")] &&
								sessionArr[dayjs(value).format("DD/MM/YYYY")].length > 0 ? (
									sessionArr[dayjs(value).format("DD/MM/YYYY")].map(
										(exo: Workout, idx: number) => {
											return (
												<tr key={(exo.exercise, idx)}>
													<th>{idx + 1}</th>
													<td>{exo.exercise}</td>
													<td>{exo.sets}</td>
													<td>{exo.reps}</td>
													<td>
														<DeleteExerciseModal
															deleteExercise={deleteExercise}
															exercise={exo.exercise}
														/>
														{/* <button
															className="flex items-center justify-center"
															onClick={() =>
																document
																	.getElementById("my_modal_5")
																	.showModal()
															}
														>
															<TiDelete className="text-xl" />
														</button>
														<dialog
															id="my_modal_5"
															className="modal modal-bottom sm:modal-middle"
														>
															<div className="modal-box">
																<p className="mb-4 text-lg font-medium text-center">
																	Are you sure you want to remove this exercise
																	from the session ?
																</p>
																<span className="text-xl font-semibold text-accent">
																	{exo.exercise}
																</span>
																<div className="flex justify-center mt-4 gap-x-3">
																	<button
																		className="border btn btn-sm btn-ghost border-base-content "
																		onClick={() => console.log("hello world")}
																	>
																		NO - Back to Dashboard
																	</button>

																	<button
																		className="btn btn-sm btn-primary "
																		onClick={() => console.log("hello world")}
																	>
																		YES - Sign Out
																	</button>
																</div>
															</div>
														</dialog> */}
														{/* <button
															type="button"
															onClick={() => deleteExercise(exo.exercise)}
															className="flex items-center justify-center"
															title="Delete exercise"
														>
															<TiDelete className="text-xl" />
														</button> */}
													</td>
												</tr>
											)
										}
									)
								) : (
									<tr>
										<td className="text-sm font-medium" colSpan={5}>
											No workout found for this day...{" "}
										</td>
									</tr>
								)}
							</tbody>
						</table>
						<button
							className="w-full mt-3 btn btn-sm btn-primary"
							onClick={handleAddSession}
						>
							Save session to calendar...
						</button>
					</div>
				</div>
				<div className="max-w-[280px] md:max-w-sm mx-auto">
					<h3 className="font-medium text-center">
						Add exercise to the workout
					</h3>
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
						<button
							type="submit"
							className="w-full my-2 btn btn-sm btn-primary"
						>
							Add exercise to the session...
						</button>
					</form>

					{/* <button
						className="w-full btn btn-sm btn-primary"
						onClick={handleAddSession}
					>
						Add session to calendar...
					</button> */}
				</div>
			</section>
		</>
	)
}
