const { Router } = require('express');
const AddressController = require('./controller/session-ctrl');

const routes = new Router();

routes.get('/address', AddressController.get);
routes.post('/address-save', AddressController.post);

module.exports = routes;
