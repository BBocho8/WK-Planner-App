import { signOut } from "firebase/auth"
import { Link } from "react-router-dom"
import { auth } from "../firebase"

import { useAuthContext } from "../context/AuthContext"

const AuthDetails = () => {
	const { authUser, setSuccess } = useAuthContext()

	const userSignOut = () => {
		signOut(auth)
			.then(() => {
				console.log("Successfully signed out")
				setSuccess(false)
			})
			.catch((err) => console.log(err))
	}

	return (
		<div>
			{authUser ? (
				<>
					<p>{`Signed in as ${authUser.email}`}</p>{" "}
					<button className="btn btn-xs" onClick={userSignOut}>
						sign out
					</button>
				</>
			) : (
				<p>Signed out</p>
			)}
		</div>
	)
}

const TempNav = () => {
	return (
		<nav className="flex flex-col  align-element navbar gap-y-2">
			<div className="flex flex-wrap gap-x-3">
				Nav TEMPORAIRE
				<Link to="/">
					<button className="btn btn-sm">Home</button>
				</Link>
				<Link to="/login">
					<button className="btn btn-sm">Login</button>
				</Link>
				<Link to="/register">
					{" "}
					<button className="btn btn-sm">Register</button>
				</Link>
			</div>
			<AuthDetails />
		</nav>
	)
}
export default TempNav
