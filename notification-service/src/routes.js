const { Router } = require('express');
const SmptService = require('./controller/smpt-ctrl');

const routes = new Router();

routes.post('/smpt', SmptService.sendEmail);

module.exports = routes;
