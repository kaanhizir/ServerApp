const express = require("express");
const bodyParser = require('body-parser');
const _ = require("underscore");
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const productsrouter = require('./routers/products-router.js');
const usersrouter = require('./routers/users-routers.js');
const albumrouter = require('./routers/albums-router.js');


const app = express();

const PORT = 5000;
const jwtSecretKey = 'mysecretkey';

// Login


app.use(bodyParser.json());







const users = JSON.parse(fs.readFileSync('./db/login-users.json'));
app.post('/login', (req, res) => {

    const { kullaniciAdi, sifre } = req.body;
    
    // Kullanıcı adı ve şifre doğrulamasını kontrol ediliri
    const foundUser = users.find(user => user.kullaniciAdi === kullaniciAdi && user.sifre === sifre);
  
    if (!foundUser) {
      return res.status(401).json({ message: 'Kimlik doğrulama başarısız.' });
    }
  
    // Kullanıcı adı doğrulandıysa JWT oluşturur

    
    const token = jwt.sign({ kullaniciAdi: foundUser.kullaniciAdi }, jwtSecretKey, { expiresIn: '1h' });
  
    res.json({ token });
    
  });
  
 
  
  // Token doğrulama işlevi
  
  function verifyToken(req, res, next) {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(403).json({ message: 'Token bulunamadı.' });
    }
  
    jwt.verify(token.split(' ')[1], jwtSecretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Token doğrulama başarısız.' });
      }
  
      req.user = decoded;
      next();
    });
  }

//Admin Permission

  function adminPermission(req, res, next) {
    if (req.user && req.user.kullaniciAdi === 'admin') {
      next(); // Kullanıcı admin ise işlemi devam ettir
    } else {
      res.status(403).json({ message: 'Bu işlem için yetkiniz yok.' });
    }
  }
  

/*LOGIN PAGE
app.post('/login', (req, res) => {
    const { kullaniciAdi, sifre } = req.body;
  const users = JSON.parse(fs.readFileSync('./db/login-users.json', 'utf-8'));

  const foundUser = users.find((user) => user.kullaniciAdi === kullaniciAdi && user.sifre === sifre);

  if (foundUser) {
    if (kullaniciAdi === 'admin') {
        // Eğer kullanıcı "admin" ise, özel bir sayfaya yönlendiriyoruz
        
        res.redirect('/adminPage');
      } else {
        if(kullaniciAdi === 'test'){
            res.redirect('/testPage');
      }
      else{
        res.send('Kullanıcı sayfasına giriş yaptınız.')
      }
    }
    } else {
      res.send('Kullanıcı adı veya şifre yanlış.');
    }
  });
*/



//AdminPage

app.get('/adminPage', verifyToken, adminPermission,(req,res)=>{
   // res.send("Admin Sayfasına Hoşgeldiniz.")

   const htmlContent = `
   <p>-Albumler Verileri için '/albums'<br></p>
   <p>-ID Kontrolu için '/albums/id'<br></p>
   <p>-Album Eklemek için '/albums/add' (PostMan ile)<br></p>
   <p>-Album Silmek için '/albums/id' (PostMan ile)<br></p><hr>
   <p>-Users Verileri için '/users'<br></p>
   <p>-ID Kontrolu için '/users/id'<br></p><hr>
   <p>-Products Verileri için '/products'<br></p>
   <p>-ID Kontrolu için '/products/id'<br></p>
 `;

 res.send(htmlContent);
})


//TestPage

app.get('/testPage',(req,res)=>{
    res.send("Test Sayfasına Hoşgeldiniz.")
})

//main


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
app.use('/products',verifyToken,productsrouter);

//Users
app.use('/users',verifyToken,usersrouter);

//Albums
app.use('/albums',verifyToken,albumrouter);


app.listen(PORT, () => {
    console.log("Server Started Port:" + PORT);
});