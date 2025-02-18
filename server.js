import express from 'express';
import bodyParser from 'body-parser';
import db from "./pgconnect.js"
// import pg from 'pg';

const app = express();
const port = 5000;

// const db = new pg.Client({
//     user: "postgres",
//     host: "localhost",
//     database: "porfolio",
//     password: "Wally90",
//     port: 5432,
// });
// db.connect();

const condb = db

condb.connect();


async function get_data(){
    const datas = await condb.query("SELECT * FROM infos");
    const resutl = datas.rows
    return resutl
    // datas.rows.forEach((data) =>{
    //     console.log(data);
    // })
}

const books = await get_data();

// const books = [
//     {
//         "id": 1,
//         "title": "The Great Gatsby", 
//         "author": "F. Scott Fitzgerald", 
//         "year": 1925
//     },
//     {
//         "id": 2,
//         "title": "1984", 
//         "author": "George Orwell", 
//         "year": 1949
//     },
//     {
//         "id": 3,
//         "title": "To Kill a Mockingbird", 
//         "author": "Harper Lee", 
//         "year": 1960
//     }
// ]

// var numBook = books.length;

app.use(bodyParser.urlencoded({extended: true}));
app.set(express.json());

// get all books 
app.get("/book", (req, res) =>{
    res.json(books)
})

// post a new books 
app.post("/post", (req, res) =>{
    const newId = numBook +1
    const newPost = {
        id: newId,
        title: req.body.title,
        author: req.body.author,
        year: req.body.year
    }
    numBook = newId;
    books.push(newPost);
    res.json(books)
})

// Editing post 
app.patch("/edit/:id", (req, res) =>{
    const id = parseInt(req.params.id);
    const editBook = books.find(book => book.id == id)
    if(req.body.title) editBook.title = req.body.title;
    if(req.body.author) editBook.author = req.body.author;
    if(req.body.year) editBook.year = req.body.year;
    res.json(editBook)
})

// Delete book 
app.delete("/delete/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const deleteBook = books.findIndex(book => book.id == id)

    books.splice(1, deleteBook);
    return res.json("message is deleted")
})


app.listen(port, () =>{
    console.log(`This server is running on port http://localhost:${port}`)
})