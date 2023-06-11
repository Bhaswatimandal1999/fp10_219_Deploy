const express = require("express")
const { connection } = require("./db")
const { userRouter } = require("./routes/user.routes")
const { notesRouter } = require("./routes/notes.routes")
const cors = require("cors")
require("dotenv").config()

const app = express()

app.use(express.json())
app.use(cors())
app.use("/users", userRouter)
app.use("/notes", notesRouter)



app.listen(process.env.port, async () => {
    try {
        console.log(`server running at ${process.env.port}`)
        await connection
        console.log("connected to db")
    } catch (err) {
        console.log(err)
        console.log("something went wrong")
    }

})