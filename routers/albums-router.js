const router = require('express').Router();
const album = require('../db/albums.js');


router.get("/",(req,res)=>{
    res.json(album);
})

router.get("/:id",(req,res,next)=>{
    const{id} = req.params.id;
    const album = products.find((album) => album.id === parseInt(id));
    res.json(album);

    
})


module.exports = router;