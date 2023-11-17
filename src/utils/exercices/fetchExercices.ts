import axios from "axios"

const customFetch = axios.create({
	baseURL: "https://sge-db.sge-db.workers.dev",
})

export default customFetch
