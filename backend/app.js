const express = require('express');
const ProductRouter = require('./router/productRouter')
const app = express();

app.use(ProductRouter)

app.listen("3000", () => {
    console.log("listening on 3000")
})