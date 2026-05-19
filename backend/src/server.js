import express from "express"
import helmet from "helmet"
import cors from "cors"
import morgan from "morgan"
import cookieParser from "cookie-parser"

const app = express()
const PORT = process.env.PORT ?? 3001

app.use(cors())
app.use(helmet())
app.use(morgan("dev"))
app.use(cookieParser(process.env.JWT_SECRET_KEY))

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
