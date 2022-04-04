const express = require('express');
const route = express.Router();

const AuthenticationController = require('../controllers/Authentication');
const UserController = require('../controllers/User');
const ShareController = require('../controllers/Share');

route.get('/user', UserController.getUserInfo);
route.post('/access-token', AuthenticationController.getAccessToken);
route.post('/share', ShareController.create);

module.exports = route;