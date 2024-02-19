const { Router } = require('express');
const SessionHandler = require('./handlers/SessionHandler');
const authMiddleware = require('./middlewares/auth');
const AddressServiceHandler = require('./handlers/AddressHandler');
const RegisterHandler = require('./handlers/RegisterHandler');
const OrderHandler = require('./handlers/OrderHandler');
const routes = new Router();

// Rotas
routes.get('/address-service', AddressServiceHandler.get);
routes.post('/address', AddressServiceHandler.post);
routes.post('/register-service', RegisterHandler.post);
routes.post('/order-service', OrderHandler.post);

// Cria uma sessão do usuário para gerar o token
routes.post('/session', SessionHandler.create);

//Auth Middleware
routes.use(authMiddleware);
routes.get('/session-validate', SessionHandler.get);

module.exports = routes;
