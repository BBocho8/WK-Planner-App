import { BottomNavigation, BottomNavigationAction } from "@mui/material"
import HeroCarousel from "../components/HeroCarousel"
import { useState } from "react"
import { FaHome } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

const Landing = () => {
	const navigate = useNavigate()
	const [value, setValue] = useState("")
	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue)
	}

	console.log(value)

	if (value === "exercices") {
		navigate("/exercices")
	}

	return (
		<main>
			<HeroCarousel />

			<div>
				Hello
				<p>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum
					qui illum unde quasi eveniet libero natus dolorum voluptatibus laborum
					minus sed inventore voluptas obcaecati incidunt provident
					exercitationem ducimus praesentium dolores cum commodi rem, excepturi
					ad! Qui placeat vero doloremque ipsam velit laudantium repudiandae
					alias voluptates iusto ut unde quod sit ea reprehenderit aperiam,
					commodi mollitia natus sequi deserunt recusandae possimus rem dolores
					harum! Molestias, magnam sequi. Repudiandae, harum ullam magni culpa
					corporis non ipsum reprehenderit minima dolor mollitia animi
					laudantium odit exercitationem sit quibusdam porro ad assumenda
					excepturi fuga voluptate esse provident possimus! Soluta porro omnis
					quia provident quasi. Hic animi ratione beatae est soluta vero, amet
					ab exercitationem natus, provident harum facilis ipsa maxime totam
					suscipit odio labore corporis dicta quibusdam libero sed? Itaque
					voluptate libero ab fugit architecto, iste perspiciatis et vel
					expedita suscipit debitis quos ratione optio veritatis, accusantium
					blanditiis necessitatibus mollitia, saepe culpa consequatur ad totam.
					Esse quod quaerat consequuntur dolores? Perspiciatis voluptate magni
					nobis laborum dolor! Voluptatum ullam mollitia et doloribus eius
					officiis quo repudiandae tempore aliquid, cupiditate cum fugiat
					placeat voluptate autem voluptas assumenda consequuntur exercitationem
					hic, numquam sunt distinctio totam? Rem recusandae, numquam, commodi
					laboriosam delectus quibusdam eos quo repellendus debitis laborum
					maxime.
				</p>
			</div>
			<div className="sm:hidden">
				<BottomNavigation showLabels value={value} onChange={handleChange}>
					<BottomNavigationAction
						label="Recents"
						icon={<FaHome />}
						value="home"
					/>
					<BottomNavigationAction
						label="Exercices"
						icon={<FaHome />}
						value="exercices"
					/>
					<BottomNavigationAction
						label="About"
						icon={<FaHome />}
						value="about"
					/>
					<BottomNavigationAction
						label="Dashboard"
						icon={<FaHome />}
						value="dashboard"
					/>
				</BottomNavigation>
			</div>
		</main>
	)
}
export default Landing
