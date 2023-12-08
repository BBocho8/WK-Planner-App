// import { useEffect, useState } from "react"
// import { db } from "../firebase"
// import { collection, getDocs } from "firebase/firestore"
import { User, useAuthContext } from "../context/AuthContext"
import { Link } from "react-router-dom"
import Sidenav from "../components/Sidenav"
import TempNav from "../components/TempNav"
import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase"

const Dashboard = () => {
	const { authUser } = useAuthContext()
	const [user, setUser] = useState<User>()
	const usersCollectionRef = collection(db, "users")

	useEffect(() => {
		const getUsers = async () => {
			const data = await getDocs(usersCollectionRef)
			setUser(
				data.docs
					.map((doc) => ({ ...doc.data(), id: doc.id }))
					.find((user) => user.id === authUser?.uid) as User
			)
		}

		getUsers()
	}, [])

	if (!authUser) {
		return (
			<p className="flex place-content-center">
				<Link to="/login" className="text-xl font-medium">
					Please Login
				</Link>
			</p>
		)
	}

	if (authUser && !user) {
		return (
			<p className="flex place-content-center">
				<Link to="/login" className="text-xl font-medium">
					Loading...
				</Link>
			</p>
		)
	}

	if (authUser && user) {
		return (
			<>
				<div id="drawer-container" className="relative">
					<TempNav />

					<Sidenav user={user} />
				</div>
			</>
		)
	}
}
export default Dashboard
