import { useEffect, useState } from "react"
import { db } from "../firebase"
import { collection, getDocs } from "firebase/firestore"
import { useAuthContext } from "../context/AuthContext"
import { Link } from "react-router-dom"
import Sidenav from "../components/Sidenav"
import TempNav from "../components/TempNav"

interface User {
	id: string
	name: string
	age: number
	weight: number
}

const Dashboard = () => {
	const { authUser } = useAuthContext()
	console.log(authUser)

	const [user, setUser] = useState<User>()
	const usersCollectionRef = collection(db, "users")

	console.log(user)
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
	}, [authUser])

	if (!authUser) {
		return (
			<p className="flex place-content-center">
				<Link to="/login" className="text-xl font-medium">
					Please Login
				</Link>
			</p>
		)
	}

	return (
		<>
			<div id="drawer-container" className="relative">
				<TempNav />

				<Sidenav />
			</div>
		</>
	)
}
export default Dashboard
