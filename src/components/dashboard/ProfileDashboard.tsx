import { RiProfileLine } from "react-icons/ri"
import { BiMaleFemale } from "react-icons/bi"
import ProfileModal from "./ProfileModal"
import { FaRegCalendarAlt, FaWeight } from "react-icons/fa"
import { MdOutlineMailOutline } from "react-icons/md"
import { GiBodyHeight } from "react-icons/gi"
import { User } from "../../context/AuthContext"

type ProfileDashboardProps = {
	user: User
}
const ProfileDashboard = ({ user }: ProfileDashboardProps) => {
	console.log(user)
	if (!user) {
		return <p>Loading....</p>
	}
	return (
		<div className="">
			<h3 className="mt-3 mb-5 text-xl font-semibold text-center">
				My Profile
			</h3>
			<div className="mx-auto shadow-xl max-w-[300px] sm:max-w-sm card sm:w-96 bg-base-100">
				<figure>
					<img
						className="object-cover w-full h-32"
						src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=2875&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						alt="Shoes"
					/>
				</figure>
				<div className="card-body">
					<ProfileModal
						inputTitle="name"
						icon={<RiProfileLine className="text-accent" />}
					/>
					<div className="my-0 divider"></div>
					<ProfileModal
						inputTitle="gender"
						icon={<BiMaleFemale className="text-accent" />}
					/>
					<div className="my-0 divider"></div>
					<ProfileModal
						inputTitle="dob"
						icon={<FaRegCalendarAlt className="text-accent" />}
					/>
					<div className="my-0 divider"></div>
					<ProfileModal
						inputTitle="height"
						icon={<GiBodyHeight className="text-accent" />}
					/>
					<div className="my-0 divider"></div>
					<ProfileModal
						inputTitle="weight"
						icon={<FaWeight className="text-accent" />}
					/>
					<div className="my-0 divider"></div>
					<ProfileModal
						inputTitle="email"
						icon={<MdOutlineMailOutline className="text-accent" />}
					/>
				</div>
			</div>
		</div>
	)
}
export default ProfileDashboard
