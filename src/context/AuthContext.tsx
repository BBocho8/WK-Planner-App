import {
	FunctionComponent,
	PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react"
import { auth } from "../firebase"
import { User as FirebaseUser, onAuthStateChanged } from "firebase/auth"

type AuthContextValue = {
	authUser: FirebaseUser | null
	loading: boolean
	success: boolean
	setSuccess: React.Dispatch<React.SetStateAction<boolean>>
}

const AuthContext = createContext<AuthContextValue>({
	authUser: null,
	loading: true,
	success: false,
	setSuccess: () => {},
})
// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => useContext(AuthContext)

const AuthProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
	const [authUser, setAuthUser] = useState<FirebaseUser | null>(null)
	const [loading, setLoading] = useState(true)
	const [success, setSuccess] = useState(false)

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

	return (
		<AuthContext.Provider value={{ authUser, loading, success, setSuccess }}>
			{!loading && children}
		</AuthContext.Provider>
	)
}

export default AuthProvider
