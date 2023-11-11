import { Outlet } from "react-router-dom"
import TempNav from "../components/TempNav"

const HomeLayout = () => {
	return (
		<>
			<TempNav />
			<section className="">
				<Outlet />
			</section>
		</>
	)
}
export default HomeLayout
