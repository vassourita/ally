import express from 'express';

import RouterAdapter from './helpers/adapters/RouterAdapter';
import UserController from './app/controllers/UserController';

const routes = express.Router();

routes.get('/users', RouterAdapter.adapt(UserController.index));

export default routes;
