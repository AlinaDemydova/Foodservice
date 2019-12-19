const express = require('express');
const mongoose = require('mongoose');
const logger = require('./config/winston');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const adminMealRouter = require('./routes/adminMeals');
const clientMealRouter = require('./routes/clientMenu');
const cartOrderRouter = require('./routes/orderCart');
const staffOrdersQueueRouter = require('./routes/staffOrdersQueue');
const adminEmployeeRouter = require('./routes/adminEmployees');

const cors = require('cors');
const config = require('config');
const routes = config.get('Backend.routes');
const dbconnect = config.get('Backend.dbconnect');
const connect = config.get('Backend.connect');
const port = process.env.PORT || connect.dutyPort;
// -------------Authorization-------------
const Authorization = require('node-authorization').Authorization;
const compileProfile = require('node-authorization').profileCompiler;
// -------------.Authorization------------

mongoose.connect(dbconnect.mongoURI, {useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => { logger.info('Connected to database!');})
    .catch(() => { logger.info('Connection failed!');})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images', express.static(path.join('../Backend/images')));
app.use(cors());

app.use(routes.clientMenuURI, clientMealRouter)
app.use(routes.adminMenuURI, adminMealRouter)
app.use(routes.cartOrderURI, cartOrderRouter)
app.use(routes.staffOrdersQueueURI, staffOrdersQueueRouter)
app.use(routes.adminEmployeesURI, adminEmployeeRouter)

logger.error();

app.listen(port);

module.exports = app;