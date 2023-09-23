const express=require("express")
const cors=require("cors")
const connection = require("./db")
const bookRouter = require("./routes/book.routes")
require("dotenv").config()


const app=express()

app.use(cors())
app.use(express.json())
app.use("/book",bookRouter)

app.listen(process.env.PORT,async(req,res)=>{
    try {
        await connection
        console.log("connected to the db")
        console.log(`server is running at port ${process.env.PORT}`)
    } catch (error) {
        console.log(error.message)
    }
})