const router = require('express').Router();
const users = require('../db/users.js');




router.get("/",(req,res)=>{
    res.json(users);
})

router.get("/:id",(req,res,next)=>{
    const{id} = req.params.id;
    const user = products.find((user) => user.id === parseInt(id));
    res.json(user);

    
})


module.exports = router;