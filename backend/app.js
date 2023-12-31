const express = require('express');
const cors = require('cors');
const ProductRouter = require('./routers/productRouter')
const OrderRouter = require('./routers/orderRouter')
const CustomerRouter = require('./routers/customerRouter')
const app = express();

app.use(cors())
app.use(express.json())
app.use('/product', ProductRouter)
app.use('/order', OrderRouter)
app.use('/customer', CustomerRouter)

app.use((req, res, next) => {
    res.status(404).json({ error: req.url + ' API not supported!' });
});
app.use((err, req, res, next) => {
    res.status(500).json({ error: 'Something is wrong! Try later' });
});

app.listen("3000", () => {
    console.log("listening on 3000")
})