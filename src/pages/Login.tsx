import { useRef, useState } from "react"
import { Form, Link, useNavigate } from "react-router-dom"
import { RxCrossCircled } from "react-icons/rx"

import { signInWithEmailAndPassword } from "firebase/auth"

import { auth } from "../firebase"
import FormInput from "../components/input/FormInput"
import SubmitBtn from "../components/input/SubmitBtn"
import { toast } from "react-toastify"
import { useAuthContext } from "../context/AuthContext"

const Login = () => {
	const navigate = useNavigate()
	// const { setAuth } = useContext(AuthContext);
	const userRef = useRef<HTMLInputElement>(null)

	const { authUser, success, setSuccess } = useAuthContext()
	const [user, setUser] = useState("")
	const [pwd, setPwd] = useState("")
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		signInWithEmailAndPassword(auth, user, pwd)
			.then((userCredential) => {
				console.log(userCredential)
				setSuccess(true)
				toast.success("You've been successfully logged in")
				navigate("/dashboard")
			})
			.catch((err: Error) => {
				console.log(err)
			})
	}

	if (authUser) {
		setSuccess(true)
	}

	return (
		<>
			{success ? (
				<section>
					<h1>You are logged in!</h1>
					<br />
					<p>
						<Link to="/">Go to Home</Link>
					</p>
				</section>
			) : (
				<section className="grid h-screen place-items-center">
					<Form
						onSubmit={handleSubmit}
						className="relative flex flex-col max-w-xl p-8 shadow-lg card sm:w-96 bg-base-100 gap-y-4 "
					>
						<button
							onClick={() => navigate("/")}
							className="absolute top-4 right-2"
						>
							<RxCrossCircled className="w-7 h-7" />
						</button>
						<h4 className="text-3xl font-bold text-center">Sign In</h4>
						<FormInput
							label="email"
							name="email"
							type="email"
							id="email"
							innerRef={userRef}
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
							innerRef={userRef}
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
								className="ml-2 capitalize link link-hover link-primary"
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
