import { createUserWithEmailAndPassword } from "firebase/auth"
import { useEffect, useRef, useState } from "react"
import { doc, setDoc } from "firebase/firestore"

import { Form, Link, useNavigate } from "react-router-dom"
import { auth, db } from "../firebase"
import FormInput from "../components/input/FormInput"
import SubmitBtn from "../components/input/SubmitBtn"
import { RxCrossCircled } from "react-icons/rx"
import { FiAlertCircle } from "react-icons/fi"
import { toast } from "react-toastify"
import { useAuthContext } from "../context/AuthContext"

const EMAIL_REGEX: RegExp =
	/^(\D)+(\w)*((\.(\w)+)?)+@(\D)+(\w)*((\.(\D)+(\w)*)+)?(\.)[a-z]{2,}$/
const PWD_REGEX: RegExp = /^.{8,24}$/

const Register = () => {
	const navigate = useNavigate()
	const userRef = useRef<HTMLInputElement>(null)

	const [user, setUser] = useState("")
	const [userFocus, setUserFocus] = useState(false)

	const [pwd, setPwd] = useState("")
	const [pwdFocus, setPwdFocus] = useState(false)
	const [validPwd, setValidPwd] = useState(false)

	const [matchPwd, setMatchPwd] = useState("")
	const [validMatch, setValidMatch] = useState(false)

	const { authUser } = useAuthContext()

	useEffect(() => {
		const result = PWD_REGEX.test(pwd)

		setValidPwd(result)
		const match = pwd === matchPwd
		setValidMatch(match)
	}, [pwd, matchPwd])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		createUserWithEmailAndPassword(auth, user, pwd)
			.then((userCredential) => {
				console.log(userCredential)
				return setDoc(doc(db, "users", userCredential.user.uid), {
					email: user,
					favoriteExercises: [""],
					name: "",
					gender: "",
					dob: "",
					weight: 0,
					height: 0,
					workouts: {
						"01/01/1970": [
							{
								exercise: "test",
								reps: 15,
								sets: 12,
							},
						],
					},
				})
			})
			.then(() => {
				navigate("/dashboard")
				toast.success("Your account have been successfully created")
			})
			.catch((error: Error) => {
				toast.error("Email already used, please provide another one")
				console.log(error)
			})
	}

	if (authUser) {
		return (
			<section>
				<h1>You already have an account</h1>
				<p>
					<Link to="/">Back to home</Link>
				</p>
			</section>
		)
	}

	return (
		<>
			<section className="grid h-screen place-items-center ">
				<Form
					className="relative flex flex-col max-w-xl p-8 shadow-lg card sm:w-96 bg-base-100 gap-y-4"
					onSubmit={handleSubmit}
				>
					<button
						onClick={() => navigate("/")}
						className="absolute top-4 right-2"
					>
						<RxCrossCircled className="w-7 h-7" />
					</button>

					<h4 className="text-3xl font-bold text-center">Register</h4>
					<FormInput
						label="email"
						name="email"
						type="email"
						id="email"
						isValid={EMAIL_REGEX.test(user)}
						innerRef={userRef}
						autoComplete="off"
						onChange={(e) => setUser(e.target.value)}
						value={user}
						required
						onFocus={() => setUserFocus(true)}
						onBlur={() => setUserFocus(false)}
					/>
					{user && !userFocus && !EMAIL_REGEX.test(user) && (
						<div className="flex items-center justify-start gap-x-1">
							<FiAlertCircle className="text-error" />
							<p className="text-sm text-error">Please provide a valid email</p>
						</div>
					)}

					<FormInput
						label="password"
						name="password"
						type="password"
						id="password"
						isValid={PWD_REGEX.test(pwd)}
						innerRef={userRef}
						autoComplete="off"
						onChange={(e) => setPwd(e.target.value)}
						value={pwd}
						required
						onFocus={() => setPwdFocus(true)}
						onBlur={() => setPwdFocus(false)}
					/>

					{pwd && pwdFocus && !PWD_REGEX.test(pwd) && (
						<div className="flex items-center justify-start gap-x-1">
							<FiAlertCircle className="text-error" />
							<p className="text-sm text-error">
								Password must contain at least 8 characters
							</p>
						</div>
					)}

					<FormInput
						label="confirm password"
						name="confirm_pwd"
						type="password"
						id="confirm_pwd"
						isValid={matchPwd ? validMatch : false}
						innerRef={userRef}
						autoComplete="off"
						onChange={(e) => setMatchPwd(e.target.value)}
						value={matchPwd}
						required
					/>

					{pwd && matchPwd && pwd !== matchPwd && (
						<div className="flex items-center justify-start gap-x-1">
							<FiAlertCircle className="text-error" />
							<p className="text-sm text-error">Passwords must match</p>
						</div>
					)}
					<div className="mt-4">
						<SubmitBtn
							text="Sign Up"
							disabled={!validPwd || !validMatch || !user ? true : false}
						/>
					</div>

					<p className="text-center">
						Already a member?
						<Link
							to="/login"
							className="ml-2 capitalize link link-hover link-primary"
						>
							login
						</Link>
					</p>
				</Form>
			</section>
		</>
	)
}
export default Register
