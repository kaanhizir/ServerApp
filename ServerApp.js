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

//Ekleme İşleme

app.get("/add", (req,res,next)=>{
    res.send("Ekleme İşlemi Burada Gerçekleşir.")
})

//Silme İşlemi

app.get("/delete",(req,res,next)=>{
    res.send("Silme İşlemi Burada Gerçekleşir.")
})

//Güncelleme İşlemi

app.get("/update",(req,res,next)=>{
    res.send("Güncelleme İşlemi Burada Gerçekleşir.")
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