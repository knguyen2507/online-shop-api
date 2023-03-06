import express from 'express';
import bodyParser from 'body-parser';
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
app.use('/v1/', userRouter);
app.use('/v1/product', productRouter);
app.use('/v1/brand', brandRouter);
app.use('/v1/category', categoryRouter);

export default app;