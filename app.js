require('dotenv').config()
require('express-async-errors')
//async errors

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const notFoundMiddleWare = require('./middleware/not-found')
const errHandllerMiddleWare = require('./middleware/error-handler')
const connectDB = require('./db/connect')
const products = require('./routes/products')
//middleware

app.use(express.json())

//Routes

app.get('/', (req, res) => res.send('<h1>Storre API</h1> <a href="/api/v1/products"> Products </a>'))

app.use('/api/v1/products',products)
// Product Route 

app.use(notFoundMiddleWare)
app.use(errHandllerMiddleWare)

const start = async () =>{
    try {
        await connectDB(process.env.CONNECT_URL)
        app.listen(port, () => console.log(`Example app listening on port ${port}!`))
    } catch (error) {
        console.log(error);
    }
}

start()