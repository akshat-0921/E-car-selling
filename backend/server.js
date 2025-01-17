import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import 'dotenv/config'
import connectDB from "./config/mongodb.js"

const app = express()
const port = 4000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(cookieParser())
connectDB()

import brandRouter from "./routes/brand.routes.js"
import showroomRouter from "./routes/showroom.routes.js"
import userRoutes from "./routes/user.routes.js";

app.use("/api/brand", brandRouter)
app.use("/api/showroom", showroomRouter)
app.use("/api/user", userRoutes);

app.get('/', (req, res) => {
   console.log("API Working")
})

app.listen(port, () => console.log(`Server is running on port: ${port}`))
