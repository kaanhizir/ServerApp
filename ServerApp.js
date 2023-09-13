const express = require("express");
const productsrouter = require('./routers/products-router.js');
const usersrouter = require('./routers/users-routers.js');
const albumrouter = require('./routers/albums-router.js');

const app = express();

const PORT = 5000;

//main

app.get("/",(req,res,next)=>{
    res.send("MainPage")
})


//Products
app.use('/products',productsrouter);

//Users
app.use('/users',usersrouter);

//Albums
app.use('/albums',albumrouter);

app.listen(PORT, () => {
    console.log("Server Started Port:" + PORT);
})