const express=require("express")
const {connection}=require("./config/db")
require("dotenv").config()
const {bookRouter}=require("./routes/bookroutes")
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json()); 

app.get("/", async (req, res) => {
  res.status(201).send("HomePage for Book find");
});

app.use("/books",bookRouter)


app.listen(process.env.port,async(req,res)=>{
    try {
        await connection
        console.log("Database is connected sucessfully!")
        
    } catch (error) {
        console.log("MongoDb is not connected.")
        console.log(error)
    }

    console.log(`Server is running on ${process.env.port}`)
})

