const express = require("express");
const bookRouter = express.Router();

const { Book } = require("../model/bookmodel");

bookRouter.post("/register", async (req, res) => {
  const { Title, Author, Genre, Description, Price } = req.body;

  try {
    const book = new Book({ Title, Author, Genre, Description, Price });
    await book.save();
    res.status(201).send({ msg: "Book Added Successfully!" });
  } catch (error) {
    res.status(401).send({ msg: error.message });
  }
});


bookRouter.get("/get",async(req,res)=>{
    try {
        const allBooks=await Book.find()
        res.status(200).send(allBooks)

    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})


bookRouter.delete("/delete/:bookId", async (req, res) => {
    const payload=req.body
    const bookId=req.params.bookId
    try{
        await Book.findByIdAndDelete({_id:bookId})
        res.status(200).send({"msg":"Book deleted succesfuly"})

    }catch(error){
        res.status(400).send({"msg":error.message})

    }
})



  
  
  bookRouter.get('/filter', async (req, res) => {
    try {
      const books = await Book  .find({ Genre: req.query.Genre });
      res.json(books);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  })


  
  bookRouter.get('/sort', async (req, res) => {
    try {
      const sort = {};
      sort[req.query.sortBy] = req.query.order;
      const books = await Book.find().sort(sort);
      res.json(books);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });



module.exports = {
  bookRouter,
};
