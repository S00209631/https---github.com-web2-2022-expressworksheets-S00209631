const express = require('express');
const mongoose  = require('mongoose');
const db = require('./database')

const app = express();
const port = 3000;

app.use(express.json());


const bookSchema = new mongoose.Schema({
    title: String,
    year_written: String
})

const Book = mongoose.model('book', bookSchema);

app.get('/books', async (req, res) => {

    try {
        const books = await Book.find().lean();
        res.json(books);
    }
    catch {
        res.status(500).json('db error')
    }
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.post('/books', async (req, res) => {

    let book = new Book(req.body);
    try {

      book = await book.save();
      res.location(`/${book._id}`)
        .status(201)
        .json(book);
    }
    catch (error) {
      res.status(500).json('db_error ' + error);
    }
  
  
  });

