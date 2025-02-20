import express, { response } from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';


const app = express();
const port = 4000;
const url = 'http://localhost:5000'

app.use(bodyParser.urlencoded({extended: true}))
app.set(express.json())
app.use(express.static("public"))

// get all post 
app.get("/", async(req, res) =>{
    try {
        const response = await axios.get(`${url}/book`)
        // console.log(response.data)
        res.render("index.ejs", {
            datas: response.data,
            title: "Portfolio"
        })
    } catch (error) {
        // Log the error if the request fails
        console.error('Error fetching data:', error);
        // Send an error response to the client
        res.status(500).send('Something went wrong!');
    }
})
app.get("/form", (req, res) =>{
    res.render("form.ejs", {
        title: "Post"
    })
})

// posted a new post 
app.post("/post", async(req, res) =>{
    const response = await axios.post(`${url}/post`, req.body);
    console.log(response.data)
    res.redirect("/")
})



app.listen(port, (req, res) =>{
    console.log(`This server is running on port ${port}`)
})