import { FaEnvelope } from "react-icons/fa"
import { FaLocationDot } from "react-icons/fa6"
import { IoCalendar, IoCall } from "react-icons/io5"
import SubmitBtn from "../components/input/SubmitBtn"
import { toast } from "react-toastify"
import { useState } from "react"
import FormInput from "../components/input/FormInput"
import { IoIosStats } from "react-icons/io"
import { AiOutlineFileSearch } from "react-icons/ai"
import hero4 from "../assets/images/Hero4.jpg"

const About = () => {
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [message, setMessage] = useState("")

	const handleFormSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		try {
			const newUserMessage = { name, email, message }
			console.log(newUserMessage)
			setName("")
			setEmail("")
			setMessage("")
			toast.success("Message sent successfully")
		} catch (err) {
			console.log(err)
			toast.error("Message not sent, please try again later")
		}
	}

	return (
		<div>
			<section className="grid md:grid-cols-2 bg-bgGrey ">
				<img
					src={hero4}
					alt="what we do image"
					className="object-cover object-center w-full h-full"
				/>

				<div className="flex flex-col items-center justify-center max-w-sm px-4 mx-auto my-12 sm:px-0 md:my-24">
					<h2 className="text-2xl font-bold uppercase sm:text-3xl">About Us</h2>
					<h3 className="font-medium text-center ">
						We help you track your workouts easily
					</h3>
					<div className="flex items-center justify-center mt-8 gap-x-6">
						<div>
							<IoIosStats className="w-16 h-16 text-accent" />
						</div>
						<div className="flex flex-col items-start ">
							<h4 className="font-medium uppercase">Track your progress</h4>
							<p className="font-light ">
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Eligendi qui minima obcaecati vero aspernatur fugit similique
								iusto corrupti animi,{" "}
							</p>
						</div>
					</div>
					<div className="flex items-center justify-center mt-8 gap-x-6">
						<div>
							<IoCalendar className="w-16 h-16 text-accent" />
						</div>
						<div className="flex flex-col items-start ">
							<h4 className="font-medium uppercase">Plan your workouts</h4>
							<p className="font-light ">
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Eligendi qui minima obcaecati vero aspernatur fugit similique
								iusto corrupti animi,{" "}
							</p>
						</div>
					</div>
					<div className="flex items-center justify-center mt-8 gap-x-6">
						<div>
							<AiOutlineFileSearch className="w-16 h-16 text-accent" />
						</div>
						<div className="flex flex-col items-start ">
							<h4 className="font-medium uppercase">Look for new exercices</h4>
							<p className="font-light ">
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Eligendi qui minima obcaecati vero aspernatur fugit similique
								iusto corrupti animi,{" "}
							</p>
						</div>
					</div>
				</div>
			</section>
			<section className="flex flex-col items-center justify-center py-16 ">
				<h2 className="w-full max-w-md px-4 mb-4 text-xl font-bold text-center uppercase sm:mb-8 sm:text-2xl sm:px-0">
					Ask us anything <span className="text-primary">and we'll get</span>{" "}
					back soon in a day
				</h2>
				<form
					action=""
					className="flex flex-col w-full max-w-xs sm:max-w-lg gap-y-4"
					onSubmit={handleFormSubmit}
					id="contact"
				>
					<div className="flex items-center justify-center gap-x-2">
						<div className="w-1/2">
							<FormInput
								label="name:"
								name="name"
								type="text"
								id="name"
								autoComplete="off"
								onChange={(e) => setName(e.target.value)}
								value={name}
								required
							/>
						</div>
						<div className="w-1/2">
							<FormInput
								label="email:"
								name="email"
								type="email"
								id="email"
								autoComplete="off"
								onChange={(e) => setEmail(e.target.value)}
								value={email}
								required
							/>
						</div>
					</div>
					<div className="flex justify-center form-control">
						<label htmlFor="message" className="label">
							<span className="capitalize label-text">Message:</span>
						</label>
						<textarea
							name="message"
							id="message"
							value={message}
							rows={5}
							onChange={(e) => setMessage(e.target.value)}
							className="text-base textarea textarea-bordered"
							required
						></textarea>
					</div>
					<SubmitBtn text="SEND MESSAGE" />
				</form>
			</section>

			<section>
				<div className="grid grid-cols-1 sm:grid-cols-3 text-base-100">
					<div className="flex flex-col items-center justify-center text-center py-7 sm:py-16 bg-neutral gap-y-4">
						<div>
							<FaEnvelope className="w-8 h-8" />
						</div>
						<h3>Office Address</h3>
						<div>
							<p>Auf Weihsert, 98</p>
							<p>56637 Plaidt, Germany</p>
						</div>
					</div>
					<div className="flex flex-col items-center justify-center text-center py-7 sm:py-16 bg-primary gap-y-4">
						<div>
							<FaLocationDot className="w-8 h-8" />
						</div>
						<h3>Email us</h3>
						<div>
							<p>staff@wk-planner.com</p>
							<p>support@wk-planner.com</p>
						</div>
					</div>
					<div className="flex flex-col items-center justify-center text-center py-7 sm:py-16 bg-neutral gap-y-4">
						<div>
							<IoCall className="w-8 h-8" />
						</div>
						<h3>Call us</h3>
						<div>
							<p>+33 6 21 56 80 00</p>
							<p>+33 6 02 16 06 96</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}
export default About
