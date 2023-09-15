const express = require("express");
const bodyParser = require('body-parser');
const _ = require("underscore");
const path = require('path');
const fs = require('fs');

const productsrouter = require('./routers/products-router.js');
const usersrouter = require('./routers/users-routers.js');
const albumrouter = require('./routers/albums-router.js');

const app = express();

const PORT = 5000;


// Login

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());





app.get('/login',(req,res) => {
    res.sendFile(path.join(__dirname,'/public/index.html'));
   
});


app.post('/login', (req, res) => {
    const { kullaniciAdi, sifre } = req.body;
  const users = JSON.parse(fs.readFileSync('./db/login-users.json', 'utf-8'));

  const foundUser = users.find((user) => user.kullaniciAdi === kullaniciAdi && user.sifre === sifre);

  if (foundUser) {
    if (kullaniciAdi === 'admin') {
        // Eğer kullanıcı "admin" ise, özel bir sayfaya yönlendiriyoruz
        
        res.redirect('/add');
      } else {
        res.send('Başarıyla giriş yaptınız.');
      }
    } else {
      res.send('Kullanıcı adı veya şifre yanlış.');
    }
  });


app.post("/add",(req,res)=>{
    res.send("Post İsteği Gönderildi.")

    
})

//main

app.get("/",(req,res,next)=>{
    res.send("Giriş Yapmak İçin '/login' yazınız" )
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
});