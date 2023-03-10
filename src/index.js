import express from 'express';
import bodyParser from 'body-parser';
import createError from 'http-errors';
// database
import { db } from './database/init.mongodb.js';
// Routes v1
import productRouter from './api/v1/routes/product.route.js';
import brandRouter from './api/v1/routes/brand.route.js';
import categoryRouter from './api/v1/routes/category.route.js';
import userRouter from './api/v1/routes/user.route.js';

const app = express();
app.use(bodyParser.json());

// init database
db;

// Home page
app.get('/', (req, res) => {
    res.send("<h1>HOME PAGE</h1>")
})

// use Routes v1
app.use('/v1/user', userRouter);
app.use('/v1/product', productRouter);
app.use('/v1/brand', brandRouter);
app.use('/v1/category', categoryRouter);

// Route error
app.use((req, res, next) => {
    next(createError.NotFound('This route does not exist!'));
});
app.use((err, req, res, next) => {
    res.json({
        status: err.status || 500,
        message: err.message
    })
})

export default app;