import { User } from "../../context/AuthContext"
type WorkoutDashboardProps = {
	user: User
}
const WorkoutsDashboard = ({ user }: WorkoutDashboardProps) => {
	console.log(user)
	return <div>WorkoutsDashboard</div>
}
export default WorkoutsDashboard
