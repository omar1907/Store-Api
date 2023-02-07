const productModel = require('../models/product')

const getAllProducts = async(req, res) =>{
    const Products = await productModel.find({company:"ikea"})
        res.status(200).json({msg:"All Products",nbHits:Products.length,Products})
}

const getAllProductsActions = async(req, res) =>{
    const {featured, company, name, sort,fields,filter} = req.query
    const filterObject = {}
    if(featured){
        filterObject.featured = featured === 'true'? true:false
    }
    if(company){
        filterObject.company = company
    }

    if (name) {
        filterObject.name = { $regex: name, $options: 'i' };
    }

    if(filter){
        const operatorMap = {
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'$lte',
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g
        let filteration = filter.replace(regEx,(match)=> `-${operatorMap[match]}-`)
        const options = ['price','rating']
        filteration = filteration.split(',').forEach((item) =>{
            const [field,operator,value] = item.split('-')
            if(options.includes(field)){
                filterObject[field] = {[operator]:Number(value)}
            }
        })
        console.log(filteration);
    }
    console.log(filterObject);
    let results = productModel.find(filterObject)

    if(sort){
        const sortList = sort.split(',').join(' ')
        results = results.sort(sortList)
    }else{
        results = results.sort('createdAt')
    }

    if(fields){
        const fieldList = fields.split(',').join(' ')
        results = results.select(fieldList)
    }

    const PG_NUMBER = Number(req.query.page) || 1
    const LIMIT = Number(req.query.limit) || 5
    const SKIP = (PG_NUMBER -1) * LIMIT

    results = results.skip(SKIP).limit(LIMIT)
    const Products = await results

    res.status(200).json({Products,nbHits:Products.length})
}

module.exports = {
    getAllProducts,getAllProductsActions
}