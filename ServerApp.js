const express = require("express");

//const data = require("./db/products.js");
const products = require("./db/products.js");
const users = require("./db/users.js")
const app = express();

const PORT = 5000;

//Products

app.get("/products",(req,res,next) => {

    res.json(products);

});

app.get("/products/:id",(req,res,next)=>{
    const{id} = req.params;
    const prod = products.find((prod) => prod.id === parseInt(id));
    res.json(prod);
})


//Users

app.get("/users",(req,res,next)=>{
    res.json(users);
})



app.listen(PORT, () => {
    console.log("Server Started Port:" + PORT);
})