import { doc } from "firebase/firestore"
import { db } from "../firebase"

export function getUserRef(refID: string) {
	return doc(db, "users", refID)
}
