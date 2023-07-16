const express = require('express');
const cors = require('cors');
const ProductRouter = require('./router/productRouter')
const OrderRouter = require('./router/orderRouter')
const CustomerRouter = require('./router/customerRouter')
const app = express();

app.use(cors())
app.use(express.json())
app.use('/product',ProductRouter)
app.use('/order',OrderRouter)
app.use('/customer',CustomerRouter)

app.listen("3000", () => {
    console.log("listening on 3000")
})