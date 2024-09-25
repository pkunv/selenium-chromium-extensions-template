import fs from "fs"
import { Worker } from "worker_threads"

const names = Array.from({ length: 20 }, (_, i) => `worker-${i}`)

fs.mkdirSync("screenshots", { recursive: true })

for (const name of names) {
	new Worker("./dist/worker.js", { workerData: { name } })
}
