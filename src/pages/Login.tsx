import { useRef, useState } from "react"
import { Form, Link, useNavigate } from "react-router-dom"
import { RxCrossCircled } from "react-icons/rx"

import { signInWithEmailAndPassword } from "firebase/auth"

import { auth } from "../firebase"
import FormInput from "../components/input/FormInput"
import SubmitBtn from "../components/input/SubmitBtn"

const Login = () => {
	const navigate = useNavigate()
	// const { setAuth } = useContext(AuthContext);
	const userRef = useRef<HTMLInputElement>(null)

	const [user, setUser] = useState("")
	const [pwd, setPwd] = useState("")
	const [success, setSuccess] = useState(false)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		console.log(user, pwd)
		signInWithEmailAndPassword(auth, user, pwd)
			.then((userCredential) => {
				console.log(userCredential)
				setSuccess(true)
				navigate("/")
			})
			.catch((err: Error) => {
				console.log(err)
			})
	}

	return (
		<>
			{success ? (
				<section>
					<h1>You are logged in!</h1>
					<br />
					<p>
						<a href="/">Go to Home</a>
					</p>
				</section>
			) : (
				<section className="h-screen grid place-items-center">
					<Form
						onSubmit={handleSubmit}
						className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4 relative"
					>
						<button
							onClick={() => navigate("/")}
							className="absolute top-4 right-2"
						>
							<RxCrossCircled className="w-7 h-7" />
						</button>
						<h4 className="text-center text-3xl font-bold">Sign In</h4>
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
						<div className="mt-4">
							<SubmitBtn text="Sign In" />
						</div>
						<p className="text-center">
							Not a member yet ?{" "}
							<Link
								to="/register"
								className="ml-2 link link-hover link-primary capitalize"
							>
								Register
							</Link>
						</p>
					</Form>
				</section>
			)}
		</>
	)
}
export default Login
