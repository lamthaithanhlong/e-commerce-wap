const express = require('express');
const CartRouter = require('./backend/router/cartRouter')
const app = express();

app.use(CartRouter)

app.listen("3000", () => {
    console.log("listening on 3000")
})