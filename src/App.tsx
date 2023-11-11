import { RouterProvider, createBrowserRouter } from "react-router-dom"
import {
	Landing,
	HomeLayout,
	Error,
	Register,
	Login,
	About,
	Dashboard,
} from "./pages"

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomeLayout />,
		errorElement: <Error />,
		children: [
			{
				index: true,
				element: <Landing />,
			},
			{
				path: "/about",
				element: <About />,
			},
			{
				path: "/dashboard",
				element: <Dashboard />,
			},
		],
	},
	{
		path: "/register",
		element: <Register />,
	},
	{
		path: "/login",
		element: <Login />,
	},
])

export default function App() {
	return <RouterProvider router={router} />
}
