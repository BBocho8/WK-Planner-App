import { Outlet } from "react-router-dom"
import TempNav from "../components/TempNav"

const HomeLayout = () => {
	return (
		<div className="">
			<TempNav />
			<Outlet />
		</div>
	)
}
export default HomeLayout
