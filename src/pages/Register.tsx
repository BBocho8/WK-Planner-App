import { createUserWithEmailAndPassword } from "firebase/auth"
import { useEffect, useRef, useState } from "react"

import { Form, Link, useNavigate } from "react-router-dom"
import { auth } from "../firebase"
import FormInput from "../components/input/FormInput"
import SubmitBtn from "../components/input/SubmitBtn"

// const USER_REGEX: RegExp = /^[A-z][A-z0-9-_]{3,23}$/
const PWD_REGEX: RegExp =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
// const REGISTER_URL: string = "/register"

const Register = () => {
	const navigate = useNavigate()
	const userRef = useRef<HTMLInputElement>(null)
	const errRef = useRef<HTMLParagraphElement>(null)

	const [user, setUser] = useState("")
	// const [validName, setValidName] = useState(false)
	// const [userFocus, setUserFocus] = useState(false)

	const [pwd, setPwd] = useState("")
	const [validPwd, setValidPwd] = useState(false)
	// const [pwdFocus, setPwdFocus] = useState(false)

	const [matchPwd, setMatchPwd] = useState("")
	const [validMatch, setValidMatch] = useState(false)
	// const [matchFocus, setMatchFocus] = useState(false)

	const [errMsg, setErrMsg] = useState("")
	const [success, setSuccess] = useState(false)

	useEffect(() => {
		userRef.current?.focus()
	}, [])

	// useEffect(() => {
	// 	const result = USER_REGEX.test(user)

	// 	setValidName(result)
	// }, [user])

	useEffect(() => {
		const result = PWD_REGEX.test(pwd)

		setValidPwd(result)
		const match = pwd === matchPwd
		setValidMatch(match)
	}, [pwd, matchPwd])

	useEffect(() => {
		setErrMsg("")
	}, [user, pwd, matchPwd])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		createUserWithEmailAndPassword(auth, user, pwd)
			.then((userCredential) => {
				console.log(userCredential)
				navigate("/")
			})
			.catch((error: Error) => {
				console.log(error)
			})
		console.log(user, pwd)

		setSuccess(true)
	}

	return (
		<>
			{success ? (
				<section>
					<h1>Success!</h1>
					<p>
						<Link to="login">Sign In</Link>
					</p>
				</section>
			) : (
				<section className="h-screen grid place-items-center">
					<p
						ref={errRef}
						className={
							errMsg
								? "bg-pink-200 text-red-600 font-bold p-2 mb-2  "
								: "absolute left-[-9999px]"
						}
					>
						{errMsg}
					</p>
					<Form
						className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
						onSubmit={handleSubmit}
					>
						<h4 className="text-center text-3xl font-bold">Register</h4>
						<FormInput
							label="email"
							name="email"
							type="email"
							id="email"
							ref={userRef}
							autoComplete="off"
							onChange={(e) => setUser(e.target.value)}
							value={user}
							required
						/>

						<FormInput
							label="password"
							name="password"
							type="password"
							id="password"
							ref={userRef}
							autoComplete="off"
							onChange={(e) => setPwd(e.target.value)}
							value={pwd}
							required
						/>

						<FormInput
							label="confirm password"
							name="confirm_pwd"
							type="password"
							id="confirm_pwd"
							ref={userRef}
							autoComplete="off"
							onChange={(e) => setMatchPwd(e.target.value)}
							value={matchPwd}
							required
						/>
						<div className="mt-4">
							<SubmitBtn
								text="Sign Up"
								disabled={!validPwd || !validMatch ? true : false}
							/>
						</div>

						<p className="text-center">
							Already a member?
							<Link
								to="/login"
								className="ml-2 link link-hover link-primary capitalize"
							>
								login
							</Link>
						</p>
					</Form>
				</section>
			)}
		</>
	)
}
export default Register
