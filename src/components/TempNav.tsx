// import { signOut } from "firebase/auth"
// import { Link, useNavigate } from "react-router-dom"
// import { auth } from "../firebase"

// import { useAuthContext } from "../context/AuthContext"
// import { toast } from "react-toastify"

// const AuthDetails = () => {
// 	const navigate = useNavigate()
// 	const { authUser, setSuccess } = useAuthContext()

// 	const userSignOut = () => {
// 		signOut(auth)
// 			.then(() => {
// 				console.log("Successfully signed out")
// 				toast.success("You logged out successfully")
// 				navigate("/")

// 				setSuccess(false)
// 			})
// 			.catch((err) => console.log(err))
// 	}

// 	return (
// 		<div>
// 			{authUser ? (
// 				<>
// 					<p>{`Signed in as ${authUser.email}`}</p>{" "}
// 					<button className="btn btn-xs" onClick={userSignOut}>
// 						sign out
// 					</button>
// 				</>
// 			) : (
// 				<p>Signed out</p>
// 			)}
// 		</div>
// 	)
// }

// const TempNav = () => {
// 	return (
// 		<nav className="fixed z-10 w-full bg-base-100">
// 			<div className="flex flex-wrap items-center justify-between h-14 align-element">
// 				<span className="text-xl italic font-extrabold tracking-wide uppercase font-roboto">
// 					WK Planner
// 				</span>
// 				<div className="flex gap-x-3">
// 					<Link to="/">
// 						<button className="btn btn-sm">Home</button>
// 					</Link>
// 					<Link to="/login">
// 						<button className="btn btn-sm">Login</button>
// 					</Link>
// 					<Link to="/register">
// 						<button className="btn btn-sm">Register</button>
// 					</Link>
// 				</div>
// 				<div>
// 					<AuthDetails />
// 				</div>
// 			</div>
// 		</nav>
// 	)
// }
// export default TempNav

import { signOut } from "firebase/auth"
import { auth } from "../firebase"
import { useEffect, useRef, useState } from "react"
import { FaBars } from "react-icons/fa"
import { NavLink, useNavigate, useLocation } from "react-router-dom"
import { useAuthContext } from "../context/AuthContext"
import { toast } from "react-toastify"
import NavButton from "./input/NavButton"
import { useOnClickOutside } from "usehooks-ts"

type NavLink = {
	id: number
	url: string
	text: string
	displayMainNav: boolean
	displayMobileNav: boolean
	authRelated?: boolean
}
// type NavSocialLink = {
// 	id: number
// 	url: string
// 	Icon: IconType
// }

const links: NavLink[] = [
	{
		id: 1,
		url: "/",
		text: "home",
		displayMainNav: true,
		displayMobileNav: true,
	},
	{
		id: 2,
		url: "/login",
		text: "login",
		displayMainNav: false,
		displayMobileNav: true,
		authRelated: true,
	},
	{
		id: 3,
		url: "/register",
		text: "register",
		displayMainNav: false,
		displayMobileNav: true,
		authRelated: true,
	},
	{
		id: 4,
		url: "/about",
		text: "about",
		displayMainNav: true,
		displayMobileNav: true,
	},
	{
		id: 5,
		url: "/dashboard",
		text: "dashboard",
		displayMainNav: true,
		displayMobileNav: true,
	},

	{
		id: 6,
		url: "/exercices",
		text: "exercices",
		displayMainNav: true,
		displayMobileNav: true,
	},
]

const Navbar = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const { authUser, setSuccess } = useAuthContext()
	const [showLinks, setShowLinks] = useState(false)
	const [isLoggedIn, setIsLoggedIn] = useState(authUser ? true : false)

	useEffect(() => {
		if (authUser) {
			setIsLoggedIn(true)
		} else setIsLoggedIn(false)
	}, [authUser])

	const linkContainerRef = useRef<HTMLDivElement>(null)
	const linksRef = useRef<HTMLDivElement>(null)
	const showLinksRef = useRef<HTMLDivElement>(null)
	const btnRef = useRef<HTMLButtonElement>(null)

	const toggleLinks = () => {
		setShowLinks(!showLinks)
	}

	const userSignOut = () => {
		signOut(auth)
			.then(() => {
				console.log("Successfully signed out")
				toast.success("You logged out successfully")
				navigate("/")

				setSuccess(false)
			})
			.catch((err) => console.log(err))
	}

	const linkStyles: { height: string } = {
		height: showLinks
			? `${linksRef?.current?.getBoundingClientRect().height}px`
			: "0px",
	}

	const getUrlID = () => {
		const { pathname } = location
		const splitLocation = pathname.split("/")
		return `/${splitLocation[1]}`
	}

	// const UserMenu = (authUser: User | null) => {
	// 	return (
	// 		<div className="flex-none">
	// 			<div className="p-0 px-1 m-0 menu menu-horizontal">
	// 				<li>
	// 					<details>
	// 						<summary>
	// 							<FaUser className="text-xl" />
	// 						</summary>
	// 						<ul className="flex flex-col items-center p-2 bg-base-100 ">
	// 							{!authUser ? (
	// 								<>
	// 									<li>
	// 										<Link to="/login" className="font-medium">
	// 											Login
	// 										</Link>
	// 									</li>
	// 									<li>
	// 										<Link to="/register" className="font-medium">
	// 											Register
	// 										</Link>
	// 									</li>
	// 								</>
	// 							) : (
	// 								<>
	// 									<li>
	// 										<Link to="/dashboard" className="font-medium">
	// 											Dashboard
	// 										</Link>
	// 									</li>
	// 									<li>
	// 										<div onClick={userSignOut} className="font-medium">
	// 											Signout
	// 										</div>
	// 									</li>
	// 								</>
	// 							)}
	// 						</ul>
	// 					</details>
	// 				</li>
	// 			</div>
	// 		</div>
	// 	)
	// }

	const handleClickOutside = (e: Event) => {
		if (
			!btnRef.current?.contains(e.target as Element) &&
			!showLinksRef.current?.contains(e.target as Element) &&
			showLinks
		) {
			setShowLinks(false)
		}
	}

	useOnClickOutside(linksRef, (e) => handleClickOutside(e))

	return (
		<nav className="relative ">
			<div className="nav-center">
				<div className="nav-header">
					<div
						className="flex items-center justify-center cursor-pointer gap-x-3"
						onClick={() => navigate("/")}
					>
						<span className="text-xl italic font-extrabold tracking-wide uppercase font-roboto ">
							WK Planner
						</span>
					</div>
					<div ref={linksRef} id="ttt">
						<button
							ref={btnRef}
							className={
								showLinks ? "nav-toggle text-primary rotate-90" : "nav-toggle"
							}
							onClick={toggleLinks}
						>
							<FaBars className="text-2xl " />
						</button>
						{showLinks && (
							<div
								ref={showLinksRef}
								className="absolute right-0 flex flex-col items-center justify-center gap-2 mt-4 top-[48px] links md:hidden bg-base-100  z-[1] p-2 shadow  rounded-box w-52 "
							>
								{links
									.filter(
										(link) =>
											link.displayMobileNav === true &&
											link.authRelated !== true
									)
									.map((link) => {
										const { id, url, text } = link
										const isActive = getUrlID() === url

										return (
											<NavLink
												key={id}
												to={url}
												className={
													isActive
														? "active-nav text-primary"
														: "active-nav text-neutral"
												}
												onClick={() => setShowLinks(false)}
											>
												{text}
											</NavLink>
										)
									})}
								{!authUser &&
									links
										.filter((link) => link.authRelated === true)
										.map((link) => {
											const { id, url, text } = link
											const isActive = getUrlID() === url

											return (
												<NavLink
													key={id}
													to={url}
													className={
														isActive
															? "active-nav text-primary"
															: "active-nav text-neutral"
													}
													onClick={() => setShowLinks(false)}
												>
													{text}
												</NavLink>
											)
										})}
								<div>
									{authUser ? (
										<>
											<p>{`Signed in as ${authUser.email}`}</p>{" "}
											<button
												className="flex justify-center mt-2 btn btn-sm"
												onClick={userSignOut}
											>
												sign out
											</button>
										</>
									) : (
										<div className="flex justify-center mt-2 badge badge-neutral badge-lg ">
											Signed out
										</div>
									)}
								</div>
							</div>
						)}
					</div>
				</div>
				<div
					className="hidden md:block links-container"
					ref={linkContainerRef}
					style={linkStyles}
				>
					<div className="flex justify-center gap-2 " ref={linksRef}>
						{links
							.filter((link) => link.displayMainNav === true)
							.map((link) => {
								const { id, url, text } = link
								const isActive = getUrlID() === url
								return (
									<NavLink
										key={id}
										to={url}
										className={
											isActive
												? "active-nav text-primary "
												: "active-nav text-neutral hover:text-accent"
										}
									>
										{text}
									</NavLink>
								)
							})}
					</div>
				</div>

				<div className="hidden md:flex md:flex-col md:items-center nav-animation">
					{/* {authUser ? (
						<div>
							<button onClick={() => handleUserClick(authUser)}>
								<FaUser />
							</button>
						</div>
					) : (
						<div>
							<button>
								<FaUser />
							</button>
						</div>
					)} */}
					<NavButton isLoggedIn={isLoggedIn} userSignOut={userSignOut} />
					{/* {UserMenu(authUser)} */}
				</div>
				{/* {showLinks && (
					<div
						className="absolute right-0 flex flex-col items-center justify-center gap-2 mt-4 top-[48px] links md:hidden bg-base-100  z-[1] p-2 shadow  rounded-box w-52 "
						ref={linksRef}
					>
						{links.map((link) => {
							const { id, url, text } = link
							const isActive = getUrlID() === url

							return (
								<NavLink
									key={id}
									to={url}
									className={
										isActive
											? "active-nav text-primary"
											: "active-nav text-neutral"
									}
								>
									{text}
								</NavLink>
							)
						})}
						<div>
							{authUser ? (
								<>
									<p>{`Signed in as ${authUser.email}`}</p>{" "}
									<button className="btn btn-xs" onClick={userSignOut}>
										sign out
									</button>
								</>
							) : (
								<p>Signed out</p>
							)}
						</div>
					</div>
				)} */}
			</div>
		</nav>
	)
}
export default Navbar
