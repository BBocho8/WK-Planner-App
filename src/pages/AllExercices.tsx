/* eslint-disable no-mixed-spaces-and-tabs */
import { useGetAllExercices } from "../utils/exercices/fetchExercices"
import { Exercice } from "../types/Exercices"
import { getExerciceID } from "../utils/exercices/getExerciceImg"
import { useState } from "react"
import { BsFillGridFill, BsList } from "react-icons/bs"
import { ExerciceCard } from "../components/ExerciceCard"
import ReactPaginate from "react-paginate"
import { Link } from "react-router-dom"

export interface ExerciceCardProps {
	exercice: Exercice
	layout: "grid" | "list"
}

const getFilteredItems = (query: string, exercices: Exercice[]) => {
	if (!query) {
		return exercices
	}
	if (query.length > 2) {
		return exercices.filter((game) =>
			game.name.toLowerCase().includes(query.toLowerCase())
		)
	}
}

const AllExercices = () => {
	const { isLoading, data, error, isError } = useGetAllExercices()
	const [filteredByLevel, setFilteredByLevel] = useState("all")
	const [query, setQuery] = useState("")

	const [displayedExercices, setDisplayedExercices] = useState<
		Exercice[] | undefined
	>(data?.exercices)

	const [pageNumber, setPageNumber] = useState(0)

	const [layout, setLayout] = useState<"grid" | "list">("grid")

	const setActiveStyles = (pattern: string) => {
		return `text-xl btn btn-circle btn-sm ${
			pattern === layout
				? "btn-primary text-primary-content"
				: "btn-ghost text-base-content"
		}`
	}

	if (isLoading) {
		return <p style={{ marginTop: "1rem " }}>Loading...</p>
	}

	if (isError) {
		console.log(error)
		return <div>something went wrong</div>
	}

	if (data) {
		const allExercices = data.exercices

		const filteredItems = getFilteredItems(query, allExercices)

		const beginnerExercices = data.exercices.filter(
			(exercice) => exercice.level === "beginner"
		)
		const intermediateExercices = data.exercices.filter(
			(exercice) => exercice.level === "intermediate"
		)
		const expertExercices = data.exercices.filter(
			(exercice) => exercice.level === "expert"
		)

		const handleDisplay = (e: React.ChangeEvent<HTMLSelectElement>) => {
			setFilteredByLevel(e.target.value)

			switch (e.target.value) {
				case "all":
					setDisplayedExercices(allExercices)
					break
				case "beginner":
					setDisplayedExercices(beginnerExercices)
					break
				case "intermediate":
					setDisplayedExercices(intermediateExercices)
					break
				case "expert":
					setDisplayedExercices(expertExercices)
					break

				default:
					break
			}
		}

		const exosPerPage = 12
		const pagesVisited = pageNumber * exosPerPage

		const displayExos = (array: Exercice[] | undefined) => {
			if (array) {
				return array
					.slice(pagesVisited, pagesVisited + exosPerPage)
					.map((exercice) => {
						return (
							<ExerciceCard
								key={exercice.id}
								exercice={exercice}
								layout={layout}
							/>
						)
					})
			}
		}

		const pageCount = Math.ceil(
			filteredByLevel === "all"
				? allExercices.length / exosPerPage
				: displayedExercices
				? displayedExercices.length / exosPerPage
				: 0
		)

		const changePage = ({ selected }: { selected: number }) => {
			setPageNumber(selected)
		}

		return (
			<>
				<h1 className="text-center">All Exercices</h1>

				<div className="flex items-center justify-between px-8 my-5 gap-x-5">
					<div className="flex gap-x-2">
						<select
							className="capitalize select select-sm select-bordered"
							defaultValue="Filter by level..."
							onChange={(e) => handleDisplay(e)}
						>
							<option disabled>Filter by level...</option>
							<option value="all">all</option>
							<option value="beginner">beginner</option>
							<option value="intermediate">intermediate</option>
							<option value="expert">expert</option>
						</select>

						<div>
							<div>
								<input
									type="search"
									name="search"
									id="search"
									onChange={(e) => setQuery(e.target.value)}
									className="input input-sm input-bordered "
									placeholder="Search by name..."
									autoComplete="off"
								/>
								<ul className="overflow-y-auto max-h-52">
									{query.length > 2 &&
										filteredItems?.map((exercice) => (
											<Link
												key={exercice.id}
												to={`/exercices/${getExerciceID(exercice.id)}`}
											>
												<p className="px-4 py-2 text-black bg-white border hover:bg-gray-300 ">
													{exercice.name}
												</p>
											</Link>
										))}
								</ul>
							</div>
						</div>
					</div>

					<div className="hidden gap-x-2 sm:flex sm:justify-center sm:items-center">
						<span className="mr-2">
							{filteredByLevel === "all"
								? `${allExercices.length} exercices`
								: displayedExercices
								? `${displayedExercices.length} exercices`
								: "No exercices found"}{" "}
						</span>
						<button
							onClick={() => setLayout("grid")}
							className={setActiveStyles("grid")}
						>
							<BsFillGridFill />
						</button>

						<button
							onClick={() => setLayout("list")}
							className={setActiveStyles("list")}
						>
							<BsList />
						</button>
					</div>
				</div>
				<div
					className={`${
						layout === "grid"
							? "grid gap-y-4 sm:gap-y-8 sm:grid-cols-2 lg:grid-cols-3 justify-center w-full  "
							: layout === "list" &&
							  "flex flex-col items-center justify-center gap-y-8 mx-4 lg:mx-auto mt-8 max-w-5xl"
					}`}
				>
					{filteredByLevel === "all"
						? displayExos(allExercices)
						: displayExos(displayedExercices)}
				</div>

				<ReactPaginate
					previousLabel={"<"}
					nextLabel={">"}
					pageCount={pageCount}
					pageRangeDisplayed={1}
					onPageChange={changePage}
					containerClassName={"paginationBttns"}
					previousLinkClassName={"previousBttn"}
					nextLinkClassName={"nextBttn"}
					disabledClassName={"paginationDisabled"}
					activeClassName={"paginationActive"}
				/>
				<p>Go to page...</p>
			</>
		)
	}
}
export default AllExercices
