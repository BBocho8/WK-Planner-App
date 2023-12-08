import * as React from "react"
import {
	styled,
	Theme,
	CSSObject,
	ThemeProvider,
	createTheme,
} from "@mui/material/styles"
import Box from "@mui/material/Box"
import MuiDrawer from "@mui/material/Drawer"
// import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar"
// import Toolbar from "@mui/material/Toolbar"
import List from "@mui/material/List"
import CssBaseline from "@mui/material/CssBaseline"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
// import MenuIcon from "@mui/icons-material/Menu"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"

import Navbar from "./TempNav"
import ProfileDashboard from "./dashboard/ProfileDashboard"
import { PiUserListFill } from "react-icons/pi"
import { FaHeart } from "react-icons/fa"
import { FaCalendarCheck } from "react-icons/fa"

import WorkoutsDashboard from "./dashboard/WorkoutsDashboard"
import SignoutModal from "./dashboard/SignoutModal"
import { User, useAuthContext } from "../context/AuthContext"
import { signOut } from "firebase/auth"
import { auth } from "../firebase"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import FavoritesExercises from "./dashboard/FavoritesExercises"

const allNavItems = (user: User) => {
	return [
		{
			title: "My Profile",
			component: <ProfileDashboard user={user} />,
			icon: <PiUserListFill />,
		},
		{
			title: "My Workouts",
			component: <WorkoutsDashboard user={user} />,
			icon: <FaCalendarCheck />,
		},
		{
			title: "Fav Exercises",
			component: <FavoritesExercises />,
			icon: <FaHeart />,
		},
	]
}

const drawerWidth = 240

const openedMixin = (theme: Theme): CSSObject => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
})

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
})

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}))

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme),
	}),
}))

const theme = createTheme({
	breakpoints: {
		values: {
			xs: 0,
			sm: 640,
			md: 768,
			lg: 1024,
			xl: 1280,
		},
	},
})

type SidenavProps = {
	user: User
}
export default function Sidenav({ user }: SidenavProps) {
	const { setSuccess } = useAuthContext()
	const navigate = useNavigate()

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

	const [open, setOpen] = React.useState(false)
	const [componentDisplayed, setComponentDisplayed] = React.useState(
		<ProfileDashboard user={user} />
	)

	const listItems = allNavItems(user)

	const handleDrawerClose = () => {
		setOpen(!open)
	}

	return (
		<ThemeProvider theme={theme}>
			<Box sx={{ display: "flex" }}>
				<CssBaseline />
				<Navbar />
				<Drawer
					variant="permanent"
					open={open}
					PaperProps={{
						sx: { position: "fixed", top: { xs: "62.5px", md: "72px" } },
					}}
					ModalProps={{
						container: document.getElementById("drawer-container"),
						style: { position: "absolute" },
					}}
				>
					<DrawerHeader>
						<IconButton
							onClick={handleDrawerClose}
							sx={{
								width: "100%",
								display: "flex",
								justifyContent: open ? "space-between" : "center",
								"&:hover": {
									backgroundColor: "transparent",
								},
							}}
						>
							{!open ? (
								<ChevronRightIcon />
							) : (
								<>
									<p className="text-base font-medium uppercase text-base-content grow">
										My Dashboard
									</p>
									<ChevronLeftIcon className="text-base-content" />
								</>
							)}
						</IconButton>
					</DrawerHeader>
					<Divider />
					<List>
						{listItems.map((item) => (
							<ListItem
								key={item.title}
								disablePadding
								sx={{ display: "block" }}
								onClick={() => setComponentDisplayed(item.component)}
							>
								<ListItemButton
									title={item.title}
									sx={{
										minHeight: 48,
										justifyContent: open ? "initial" : "center",
										px: 2.5,
									}}
								>
									<ListItemIcon
										sx={{
											minWidth: 0,
											mr: open ? 3 : "auto",
											justifyContent: "center",
										}}
									>
										{item.icon}
									</ListItemIcon>
									<ListItemText
										primary={item.title}
										sx={{ display: !open ? "none" : "flex" }}
									/>
								</ListItemButton>
							</ListItem>
						))}
					</List>
					<Divider />
					<List>
						<SignoutModal isOpen={open} userSignOut={userSignOut} />
					</List>
				</Drawer>
				<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
					<DrawerHeader />
					{componentDisplayed}
				</Box>
			</Box>
		</ThemeProvider>
	)
}
