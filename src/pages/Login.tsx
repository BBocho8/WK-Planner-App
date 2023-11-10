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
				navigate("/")
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
				<section className="h-screen  grid place-items-center">
					<Form
						onSubmit={handleSubmit}
						className="card  max-w-xl sm:w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4 relative "
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
