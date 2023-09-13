const router = require('express').Router();
const albums = require('../db/albums.js');


router.get("/",(req,res)=>{
    res.json(albums);
})

router.get("/:id",(req,res)=>{
    const{id} = req.params;
    const album = albums.find((album) => album.id === parseInt(id));
    res.json(album);

    
})


module.exports = router;