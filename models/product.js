const {Schema, Types,model} = require('mongoose')

const productSchema = Schema({
    name:{
        type:String,
        required:[true,'product name must be provided']
    },
    price:{
        type:Number,
        required:[true,'product price must be provided']
    },
    feautred:{
        type:Boolean,
        default:false
    },
    rating:{
        type:Number,
        default:4.5
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    company:{
        type:String,
        enum:{
            values:['ikea','toshiba','bmw','zara'],
            msg:'{VALUE} is not supported'
        }
        // enum:['IKEA','BMW','TOSHIBA','LIDDY']
    }
    
})

module.exports = model('Product', productSchema)

