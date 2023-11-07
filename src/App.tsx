import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Landing, HomeLayout, Error } from "./pages"

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
				path: "/results",
				element: <p>Hello World</p>,
			},
		],
	},
])

export default function App() {
	return <RouterProvider router={router} />
}
