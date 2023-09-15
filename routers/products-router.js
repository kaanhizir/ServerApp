const router = require('express').Router();
const products = require('../db/products.js');
const bodyParser = require('body-parser');
const _ = require("underscore");

//const router = express.Router();

router.get("/",(req,res)=>{

    res.json(products);

})

router.get("/:id",(req,res)=>{
    const{id} = req.params;
    const prod = products.find((prod) => prod.id === parseInt(id));
    res.json(prod);
})



module.exports = router;