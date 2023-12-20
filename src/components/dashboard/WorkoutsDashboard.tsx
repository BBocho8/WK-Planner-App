import { User } from "../../context/AuthContext"
import DashboardCalendar from "./DashboardCalendar"
type WorkoutDashboardProps = {
	user: User
}
const WorkoutsDashboard = ({ user }: WorkoutDashboardProps) => {
	console.log(user)
	return (
		<div>
			<DashboardCalendar user={user} />
		</div>
	)
}
export default WorkoutsDashboard
