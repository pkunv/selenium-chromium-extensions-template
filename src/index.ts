import fs from "fs"
import { Worker } from "worker_threads"
import { env } from "./env"

const names = Array.from({ length: env.WORKER_COUNT }, (_, i) => `worker-${i}`)

fs.mkdirSync("screenshots", { recursive: true })

for (const name of names) {
	new Worker("./dist/worker.js", { workerData: { name } })
}
