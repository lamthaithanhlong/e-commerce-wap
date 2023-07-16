const express = require('express');
const ProductRouter = require('./router/productRouter')
const OrderRouter = require('./router/orderRouter')
const app = express();

app.use(express.json())
app.use('/product',ProductRouter)
app.use('/order',OrderRouter)

app.listen("3000", () => {
    console.log("listening on 3000")
})