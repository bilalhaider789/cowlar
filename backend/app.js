const dotenv=require("dotenv")
dotenv.config()
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors= require("cors")
const todoRouter=require("./routes/todo_routes")

const app = express();
app.use(cors())
app.use(bodyParser.json());

app.use("/", todoRouter);


app.post('/users',async (req,res)=>{
  return res.status(200).send("hello")
})


const port=process.env.PORT || '7000'
const database_url=process.env.DB || 'mongodb+srv://bilal:bilal123@cluster0.epntk2e.mongodb.net/?retryWrites=true&w=majority'

// connecting mongoatlas so that server don't establish connecting with local mongodb

mongoose
  .connect(
    database_url
  )
  .then(() => {    
    app.listen(port);
    console.log("Server started at port " + port)
  })
  .catch(() => {
    console.log("error in connecting db");
  });

  module.exports=app