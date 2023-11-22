/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	plugins: [require("daisyui")],
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: "#B2456E",
					secondary: "#FBEAE7",
					accent: "#552619",
					neutral: "#1f2937",
					"base-100": "#f5f5f4",
					info: "#38bdf8",
					success: "#22c55e",
					warning: "#f59e0b",
					error: "#dc2626",
				},
			},
		],
	},
	theme: {
		extend: {
			fontFamily: {
				roboto: ["Roboto", "sans-serif"],
				lato: ["Lato", "sans-serif"],
			},
			fontSize: {
				h1: "2.5rem",
				h2: "2rem",
				h3: "1.5rem",
				h4: "0.875rem",
				h1BigScreen: "4rem",
				h2BigScreen: "2rem",
				h3BigScreen: "1rem",
				h4BigScreen: "1rem",
				body: "1rem",
			},
			colors: {
				bgGrey: "#f1f1f1",
			},
			height: {
				"nav-sm": "calc(100vh - 60px)",
				"nav-md": "calc(100vh - 72px)",
			},
			lineHeight: {
				header: "1.25",
				headerBigScreen: "1",
			},

			letterSpacing: {
				header: "0.10rem",
			},
			backgroundImage: {
				hero1: "url('assets/images/Hero1.jpg')",
				hero2: "url('assets/images/Hero2.jpg')",
				hero3: "url('assets/images/Hero3.jpg')",
			},
			spacing: {
				"nav-sm": "60px",
				"nav-md": "72px",
			},
		},
	},
}
