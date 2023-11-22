/* eslint-disable no-mixed-spaces-and-tabs */
import { useGetAllExercices } from "../utils/exercices/fetchExercices"
import { Exercice } from "../types/Exercices"
import { getExerciceID } from "../utils/exercices/getExerciceImg"
import { useEffect, useState } from "react"
import { BsFillGridFill, BsList } from "react-icons/bs"
import { ExerciceCard } from "../components/exercices/ExerciceCard"
import ReactPaginate from "react-paginate"
import { Link } from "react-router-dom"
import { getFilteredItems } from "../utils/exercices/getFilteredItems"

const AllExercices = () => {
	const { isLoading, data, error, isError } = useGetAllExercices()
	const [filteredByLevel, setFilteredByLevel] = useState("all")
	const [query, setQuery] = useState("")

	const [displayedExercices, setDisplayedExercices] = useState<
		Exercice[] | undefined
	>(data?.exercices)

	const [pageNumber, setPageNumber] = useState(0)
	const exosPerPage = 12
	const pagesVisited = pageNumber * exosPerPage
	const changePage = ({ selected }: { selected: number }) => {
		setPageNumber(selected)
	}

	useEffect(() => {
		window.scrollTo({ top: 0 })
	}, [pageNumber])

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
		const instructions = allExercices.filter(
			(ex) => ex.instructions.length > 10
		)
		// const maxInstructions = Math.max(...instructions)

		console.log(instructions)

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

		return (
			<section className="max-w-md px-8 mx-auto md:max-w-3xl lg:max-w-5xl">
				<h1 className="mt-6 mb-12 text-center">All Exercices</h1>

				<div className="flex flex-col items-center justify-between max-w-5xl mx-auto gap-y-4 md:gap-y-0 md:flex-row my-7 gap-x-5">
					<div className="flex justify-center w-full sm:w-auto gap-x-2">
						<select
							className="capitalize select select-sm select-bordered"
							defaultValue="Filter by level..."
							onChange={(e) => handleDisplay(e)}
						>
							<option disabled>Filter by level...</option>
							<option value="all" className="capitalize">
								all
							</option>
							<option value="beginner" className="capitalize">
								beginner
							</option>
							<option value="intermediate" className="capitalize">
								intermediate
							</option>
							<option value="expert" className="capitalize">
								expert
							</option>
						</select>

						<div>
							<div>
								<input
									type="search"
									name="search"
									id="search"
									onChange={(e) => setQuery(e.target.value)}
									className="text-base input input-sm input-bordered "
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

					<div className="hidden gap-x-2 md:flex md:justify-center md:items-center">
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
							? "grid gap-y-4 sm:gap-x-4 sm:gap-y-8  md:grid-cols-2 lg:grid-cols-3 justify-center w-full   "
							: layout === "list" &&
							  "flex flex-col items-center justify-center gap-y-8 mx-4 lg:mx-auto mt-8 "
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
			</section>
		)
	}
}
export default AllExercices
