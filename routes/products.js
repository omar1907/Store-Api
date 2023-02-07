const { getAllProducts, getAllProductsActions } = require('../controllers/products')

const router = require('express').Router()

router.route('/').get(getAllProducts)
router.route('/actions').get(getAllProductsActions)

module.exports = router
