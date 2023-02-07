//ADD Data to our Db
require('dotenv').config()
const connectDB = require('./db/connect')
const productModel = require('./models/product')
const productJson = require('./products.json')

const start = async() =>{
    try {
        await connectDB(process.env.CONNECT_URL)
        await productModel.deleteMany()
        await productModel.create(productJson)
        console.log('Sucess!!');
        process.exit(0)
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

start()