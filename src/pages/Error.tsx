import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom"

import img from "../assets/images/not-found.svg"

const Error = () => {
	const error: unknown = useRouteError()

	if (isRouteErrorResponse(error) && error.status === 404) {
		return (
			<div className="min-h-screen text-center flex-center flex-col ">
				<img
					src={img}
					alt="not found"
					className="w-[90vw] max-w-xl block mb-8 mt-[-3rem]"
				/>
				<h3 className="mb-2">Ohh!</h3>
				<p className="mt-2 mb-4 text-gray-500 leading-6">
					We can&apos;t seem to find the page you are looking for!
				</p>
				<Link to="/" className="py-2">
					<button className="btn">back home</button>
				</Link>
			</div>
		)
	}
	return <p>Something went wrong</p>
}
export default Error
