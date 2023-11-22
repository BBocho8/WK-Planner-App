import { Outlet } from "react-router-dom"
import TempNav from "../components/TempNav"
import BottomNav from "../components/BottomNav"
import Footer from "../components/Footer"

const HomeLayout = () => {
	return (
		<>
			<TempNav />
			<section className="min-h-outlet sm:min-h-outlet-sm md:min-h-outlet-md pt-nav-sm md:pt-nav-md">
				<Outlet />
			</section>
			<Footer />
			<BottomNav />
		</>
	)
}
export default HomeLayout
