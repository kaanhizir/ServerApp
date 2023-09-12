const express = require("express");

//const data = require("./db/products.js");
const products = require("./db/products.js");
const app = express();

const PORT = 5000;


app.get("/products",(req,res,next) => {

    res.json(products);

});

app.get("/products/:id",(req,res,next)=>{
    const{id} = req.params;
    const prod = products.find((prod) => prod.id === parseInt(id));
    res.json(prod);
})



app.listen(PORT, () => {
    console.log("Server Started Port:" + PORT);
})