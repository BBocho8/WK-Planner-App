import { Outlet } from "react-router-dom"
import TempNav from "../components/TempNav"

const HomeLayout = () => {
	return (
		<>
			<TempNav />
			<section className=" pt-nav-sm md:pt-nav-md">
				<Outlet />
			</section>
		</>
	)
}
export default HomeLayout
