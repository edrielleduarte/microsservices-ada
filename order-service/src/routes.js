const { Router } = require('express')
const OrderController = require('./controllers/order-ctrl')

const routes  = new Router()

routes.post('/order', OrderController.create)

module.exports = routes