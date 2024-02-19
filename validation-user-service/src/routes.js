const { Router } = require('express');
const UserController = require('./controllers/user-ctrl');

const routes = new Router();

routes.get('/validate-session', UserController.get);

module.exports = routes;
