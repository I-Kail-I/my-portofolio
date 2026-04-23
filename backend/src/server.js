import express from "express"
import helmet from "helmet"
import cors from "cors"
import morgan from "morgan"

const app = express()
const PORT = 5000

app.use(cors())
app.use(helmet())
app.use(morgan("dev"))

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
