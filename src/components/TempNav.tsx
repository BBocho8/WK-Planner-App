import { signOut } from "firebase/auth"
import { Link } from "react-router-dom"
import { auth } from "../firebase"

import { useAuthContext } from "../context/AuthContext"

const AuthDetails = () => {
	const { authUser } = useAuthContext()
	console.log(authUser)

	const userSignOut = () => {
		signOut(auth)
			.then(() => console.log("Successfully signed out"))
			.catch((err) => console.log(err))
	}

	return (
		<div>
			{authUser ? (
				<>
					<p>{`Signed in as ${authUser.email}`}</p>{" "}
					<button onClick={userSignOut}>sign out</button>
				</>
			) : (
				<p>Signed out</p>
			)}
		</div>
	)
}

const TempNav = () => {
	return (
		<div className="flex gap-x-4 mt-2">
			Nav TEMPORAIRE
			<Link to="/">Home</Link>
			<Link to="/login">
				<span className="text-black bg-yellow-200 p-2 rounded-md">Login</span>
			</Link>
			<Link to="/register">
				{" "}
				<span className="text-black bg-yellow-200 p-2 rounded-md">
					Register
				</span>
			</Link>
			<AuthDetails />
		</div>
	)
}
export default TempNav
