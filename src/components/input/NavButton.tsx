import Box from "@mui/material/Box"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import { Fragment, useState } from "react"
import { FaUser } from "react-icons/fa"
import { MdDashboard } from "react-icons/md"
import { Link } from "react-router-dom"
import { IconType } from "react-icons"
import { BiLogIn, BiUserPlus } from "react-icons/bi"
import { BsInfoCircle } from "react-icons/bs"

interface MenuItemType {
	id: number
	name: string
	href: string
	Icon: IconType
}

const menuItemsLoggedIn: MenuItemType[] = [
	{
		id: 1,
		name: "Dashboard",
		Icon: () => <MdDashboard className="text-xl" />,
		href: "/dashboard",
	},
	{
		id: 2,
		name: "About",
		Icon: () => <BsInfoCircle className="text-xl" />,
		href: "/about",
	},
]
const menuItemsLoggedOut: MenuItemType[] = [
	{
		id: 1,
		name: "Login",
		Icon: () => <BiLogIn className="text-xl" />,
		href: "/login",
	},
	{
		id: 2,
		name: "Register",
		Icon: () => <BiUserPlus className="text-xl" />,
		href: "/register",
	},
]

interface NavButtonProps {
	isLoggedIn: boolean
	userSignOut: () => void
}

const NavButton = ({ isLoggedIn, userSignOut }: NavButtonProps) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}

	return (
		<Fragment>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					textAlign: "center",
					// background: "none",
				}}
			>
				<Tooltip title="My account">
					<IconButton
						onClick={handleClick}
						size="medium"
						disableFocusRipple
						disableRipple
						sx={{ ml: 2 }}
						style={{ backgroundColor: "transparent" }}
					>
						<FaUser className="text-neutral hover:text-primary" />
					</IconButton>
				</Tooltip>
			</Box>
			<Menu
				anchorEl={anchorEl}
				id="account-menu"
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: "visible",
						filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
						mt: 1.5,
						"& .MuiAvatar-root": {
							width: 32,
							height: 32,
							ml: -0.5,
							mr: 1,
						},
						"&:before": {
							content: '""',
							display: "block",
							position: "absolute",
							top: 0,
							right: 14,
							width: 10,
							height: 10,
							bgcolor: "background.paper",
							transform: "translateY(-50%) rotate(45deg)",
							zIndex: 0,
						},
					},
				}}
				transformOrigin={{ horizontal: "right", vertical: "top" }}
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			>
				<div className="flex flex-col items-start justify-center">
					{isLoggedIn
						? menuItemsLoggedIn.map((item) => {
								const { href, Icon, id, name } = item
								return (
									<Link key={id} to={href}>
										<MenuItem onClick={handleClose} className="flex gap-x-1">
											<Icon />
											<span className="text-lg font-medium">{name}</span>
										</MenuItem>
									</Link>
								)
								// eslint-disable-next-line no-mixed-spaces-and-tabs
						  })
						: menuItemsLoggedOut.map((item) => {
								const { href, Icon, id, name } = item
								return (
									<Link key={id} to={href}>
										<MenuItem onClick={handleClose} className="flex gap-x-1">
											<Icon />
											<span className="text-lg font-medium">{name}</span>
										</MenuItem>
									</Link>
								)
								// eslint-disable-next-line no-mixed-spaces-and-tabs
						  })}
				</div>
				{/* {menuItemsLoggedIn.map((item) => {
                    const { href, Icon, id, name } = item
                    return (
                        <Link key={id} to={href}>
                            <MenuItem onClick={handleClose} className="flex gap-x-1">
                                <Icon />
                                <span className="text-lg font-medium">{name}</span>
                            </MenuItem>
                        </Link>
                    )
                })}
                {menuItemsLoggedOut.map((item) => {
                    const { href, Icon, id, name } = item
                    return (
                        <Link key={id} to={href}>
                            <MenuItem onClick={handleClose} className="flex gap-x-1">
                                <Icon />
                                <span className="text-lg font-medium">{name}</span>
                            </MenuItem>
                        </Link>
                    )
                })} */}

				<Divider />
				{isLoggedIn && (
					<div
						onClick={userSignOut}
						className="flex items-center justify-center"
					>
						<MenuItem onClick={handleClose}>
							<ListItemIcon>
								<span className="font-medium text-neutral">Sign Out</span>
							</ListItemIcon>
						</MenuItem>
					</div>
				)}
				{/* <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        123
                    </ListItemIcon>
                    Test
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        123
                    </ListItemIcon>
                    Test
                </MenuItem> */}
			</Menu>
		</Fragment>
	)
}
export default NavButton
