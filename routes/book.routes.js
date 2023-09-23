const express=require("express")
const BookModel=require("../model/book.model")


const bookRouter=express.Router()

bookRouter.get("/",async(req,res)=>{
   try {
       const books=await BookModel.find()
       res.status(200).json({books:books})
   } catch (error) {
       res.status(200).json({msg:error.message})
   }
})

bookRouter.post("/add",async(req,res)=>{
    const payload=req.body
    try {
        const book = new BookModel(payload)
        await book.save()
        res.status(200).json({msg:"New book has been added"})
    } catch (error) {
        res.status(200).json({msg:error.message})
    }
})

bookRouter.delete("/delete/:id",async(req,res)=>{
    const ID=req.params.id
    try {
        await BookModel.findByIdAndDelete({_id:ID})
        res.status(200).json({msg:"Book has been Deleted"})
    } catch (error) {
        res.status(200).json({msg:error.message}) 
    }
})

bookRouter.get("/filter",async(req,res)=>{
    const genre=req.query.genre
    try {
        const books=await BookModel.find({genre:genre})
        res.status(200).json({books:books})
    } catch (error) {
        res.status(200).json({msg:error.message})
    }
})

bookRouter.get("/sort",async(req,res)=>{
    const sort=req.query.sort
    try {
        if(sort=="asc"){
            const books=await BookModel.find().sort({price:1})
            res.status(200).json({books:books})
        }else{
            const books=await BookModel.find().sort({price:-1})
            res.status(200).json({books:books})
        }
    } catch (error) {
        res.status(200).json({msg:error.message})
    }
})


module.exports=bookRouter