import dotenv from "dotenv"

dotenv.config()

const requiredEnvVars = ["CHROME_BIN"]
const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar])

if (missingEnvVars.length) {
	console.error(`Missing required environment variables: ${missingEnvVars.join(", ")}`)
	process.exit(1)
}

export const env = {
	CHROME_BIN: process.env.CHROME_BIN!,
}
