import { RouterProvider, createBrowserRouter } from "react-router-dom"
import {
	Landing,
	HomeLayout,
	Error,
	Register,
	Login,
	About,
	Dashboard,
	AllExercices,
	ExerciceDetailsPage,
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
				path: "/exercices",
				element: <AllExercices />,
			},
			{
				path: "/exercices/:exerciceID",
				element: <ExerciceDetailsPage />,
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
	{
		path: "/dashboard",
		element: <Dashboard />,
	},
])

export default function App() {
	return <RouterProvider router={router} />
}
