import { Link } from "react-router-dom"
import { FaYoutube, FaFacebook } from "react-icons/fa"
import { RiInstagramFill } from "react-icons/ri"

const Footer = () => {
	return (
		<footer className="py-8 pb-20 rounded sm:px-14 sm:py-4 sm:pt-8 footer footer-center text-base-content gap-y-4 bg-bgGrey">
			<nav className="grid grid-flow-col gap-4">
				<Link to="/" className="link link-hover">
					Home
				</Link>
				<Link to="/about" className="link link-hover">
					About us
				</Link>
				<Link to="/dashboard" className="link link-hover">
					Dashboard
				</Link>
				<Link to="/exercices" className="link link-hover">
					Exercices
				</Link>
			</nav>
			<nav>
				<div className="grid grid-flow-col gap-3">
					<Link to="/">
						<FaYoutube className="w-6 h-6 " />
					</Link>
					<Link to="/">
						<FaFacebook className="w-6 h-6" />
					</Link>
					<Link to="/">
						<RiInstagramFill className="w-6 h-6" />
					</Link>
				</div>
			</nav>
			<aside className="text-center text-neutral bg-bgGrey">
				<p className="text-sm">
					Copyright <span className="font-semibold">© 2023</span> - All right
					reserved by WK Planner
				</p>
			</aside>
		</footer>
	)
}
export default Footer
