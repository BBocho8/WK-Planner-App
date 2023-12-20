import {
	FunctionComponent,
	PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react"
import { auth, db } from "../firebase"
import { User as FirebaseUser, onAuthStateChanged } from "firebase/auth"
import {
	CollectionReference,
	DocumentData,
	collection,
	getDocs,
} from "firebase/firestore"

type AuthContextValue = {
	authUser: FirebaseUser | null
	loading: boolean
	user: User | null
	isFavorite: boolean | null
	usersCollectionRef: CollectionReference<DocumentData, DocumentData>
	setUser: React.Dispatch<React.SetStateAction<User | null>>
	success: boolean
	refID: string | null
	setSuccess: React.Dispatch<React.SetStateAction<boolean>>
	setRefID: React.Dispatch<React.SetStateAction<string | null>>
	favoriteExercises: string[] | null
	setFavoriteExercises: React.Dispatch<React.SetStateAction<string[] | null>>
	setIsFavorite: React.Dispatch<React.SetStateAction<boolean | null>>
}

export interface User {
	id: string
	name?: string
	gender?: "male" | "female"
	dob?: number
	email: string
	favoriteExercises?: string[] | null
	weight?: number
	height?: number
	workouts: Workout[]
}

type Workout = {
	date: [
		{
			exercise: string
			reps: number
			sets: number
		},
	]
}

const AuthContext = createContext<AuthContextValue>({
	authUser: null,
	user: null,
	favoriteExercises: null,
	setFavoriteExercises: () => {},
	setIsFavorite: () => {},
	loading: true,
	isFavorite: null,
	success: false,
	refID: null,
	setUser: () => {},
	setSuccess: () => {},
	setRefID: () => {},
	usersCollectionRef: collection(db, "users"),
})
// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => useContext(AuthContext)

const AuthProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
	const [authUser, setAuthUser] = useState<FirebaseUser | null>(null)
	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState(true)
	const [isFavorite, setIsFavorite] = useState<boolean | null>(null)
	const [success, setSuccess] = useState(false)
	const usersCollectionRef = useMemo(() => collection(db, "users"), [])
	const [refID, setRefID] = useState<string | null>(null)
	const [favoriteExercises, setFavoriteExercises] = useState<string[] | null>(
		null
	)

	useEffect(() => {
		const listen = onAuthStateChanged(auth, (user) => {
			if (user) {
				setAuthUser(user)
				setLoading(false)
			} else {
				setAuthUser(null)
				setLoading(false)
			}
		})

		return () => {
			listen()
		}
	}, [])

	useEffect(() => {
		const getUsers = async () => {
			const data = await getDocs(usersCollectionRef)
			setUser(
				data.docs
					.map((doc) => ({ ...doc.data(), id: doc.id }))
					.find((user) => user.id === authUser?.uid) as User
			)
		}

		if (!authUser) {
			return
		}

		getUsers()
	}, [authUser, usersCollectionRef, isFavorite])

	useEffect(() => {
		if (!user) {
			return
		} else {
			setRefID(user.id)
			setFavoriteExercises(user?.favoriteExercises as string[])
		}
	}, [user])

	return (
		<AuthContext.Provider
			value={{
				authUser,
				loading,
				success,
				setSuccess,
				user,
				setUser,
				refID,
				setRefID,
				usersCollectionRef,
				isFavorite,
				setIsFavorite,
				favoriteExercises,
				setFavoriteExercises,
			}}
		>
			{!loading && children}
		</AuthContext.Provider>
	)
}

export default AuthProvider
