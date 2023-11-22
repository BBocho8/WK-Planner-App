import {
	BottomNavigation,
	BottomNavigationAction,
	ThemeProvider,
	createTheme,
} from "@mui/material"
import { useEffect, useState } from "react"
import { FaHome } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

const BottomNav = () => {
	const navigate = useNavigate()
	const [value, setValue] = useState("")

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		event.preventDefault()
		setValue(newValue)
	}

	useEffect(() => {
		if (value) {
			navigate(`/${value !== "/" ? value : ""}`)
		}
	}, [value, navigate])

	const bottomNavTheme = createTheme({
		palette: {
			primary: {
				main: "#B2456E",
			},
		},
	})

	return (
		<div className="sm:hidden">
			<ThemeProvider theme={bottomNavTheme}>
				<BottomNavigation
					showLabels
					value={value}
					onChange={handleChange}
					sx={{
						position: "fixed",
						bottom: 0,
						width: 1.0,
						backgroundColor: "#f5f5f4",
						borderTop: "1px solid #eaeae6",
					}}
				>
					<BottomNavigationAction label="Home" icon={<FaHome />} value="/" />
					<BottomNavigationAction
						label="Exercices"
						icon={<FaHome />}
						value="exercices"
					/>
					<BottomNavigationAction
						label="Dashboard"
						icon={<FaHome />}
						value="dashboard"
					/>
				</BottomNavigation>
			</ThemeProvider>
		</div>
	)
}
export default BottomNav
