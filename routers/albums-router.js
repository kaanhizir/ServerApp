const router = require('express').Router();
let albums = require('../db/albums.js');
const bodyParser = require('body-parser');
const _ = require("underscore");

router.get("/",(req,res)=>{
    res.json(albums);
})

//Add İşlemi

router.post("/add",(req,res)=>{
    let newAlbum = req.body;
    albums.push(newAlbum);
    res.send("Ekleme İşlemi Gerçekleşti.").end();

})



//Delete İşlemi
router.delete("/:id",(req,res)=>{
    const delete_album_id = req.params.id;
    const delete_album = albums.find(
        (album) => album.id === Number(delete_album_id)
    );

    if(delete_album){
        albums= albums.filter((album) => album.id !==Number(delete_album_id));
        res.send("Silme İşlemi Gerçekleşti.").end();
    }
})


// Seçilen ID'yi Getirir.
router.get("/:id",(req,res)=>{
    const{id} = req.params;
    const album = albums.find((album) => album.id === parseInt(id));
    res.json(album);

    
})



module.exports = router;