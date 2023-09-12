const express = require("express");

//const data = require("./db/products.js");
const products = require("./db/products.js");
<<<<<<< HEAD
const users = require("./db/users.js")
=======
>>>>>>> 1416163e4a3b7ff4405f63619ee89e15db701292
const app = express();

const PORT = 5000;

<<<<<<< HEAD
//Products
=======
>>>>>>> 1416163e4a3b7ff4405f63619ee89e15db701292

app.get("/products",(req,res,next) => {

    res.json(products);

});

app.get("/products/:id",(req,res,next)=>{
    const{id} = req.params;
    const prod = products.find((prod) => prod.id === parseInt(id));
    res.json(prod);
})


<<<<<<< HEAD
//Users

app.get("/users",(req,res,next)=>{
    res.json(users);
})

//
=======
>>>>>>> 1416163e4a3b7ff4405f63619ee89e15db701292

app.listen(PORT, () => {
    console.log("Server Started Port:" + PORT);
})