const express = require('express')
const app = express()
const port = 5000
var cors = require('cors')
const mongoose = require('mongoose');
const userList = require('./model/userSchema')

const jwt = require('jsonwebtoken');

const emailVerify = require('./helpers/emailVerification');
const testMiddleware = require('./middleware/testMiddleware');

const bcrypt = require('bcrypt'); // importing bcrypt for using that
const saltRounds = 10; // salt rounds for hash password in bcryipt

app.use(cors())
app.use(express.json())

// mongodb database server link
mongoose.connect('mongodb+srv://sajjadhossainsunnydev:sajjadsunny5463@cluster0.oqzix2r.mongodb.net/mydata?retryWrites=true&w=majority').then(() => console.log('connected'))


const users = [
   {
      firstname: "sajjad",
      lastname: 'sunny',
      email: 'sajjad@gmail.com',
      password: '001',
   },
   {
      firstname: "masud",
      lastname: 'rana',
      email: 'masud@gmail.com',
      password: '002',
   },
]

app.get('/', (req, res) => {
   res.send('Hello World!')
})

// app.get('/users', testMiddleware, (req, res) => {
//    res.send(users)
// })
app.get('/users', testMiddleware, async (req, res) => {
   try {
      const users = await userList.find({});
      res.send(users);
   } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).send('Internal Server Error');
   }
});

app.post('/users', (req, res) => {
   const newUser = req.body;
   const { firstname, lastname, email, password } = newUser;
   var token = jwt.sign({ id: email }, 'sunny');
   console.log('token: ', token);
   // checking inputs are empty or not
   if (!firstname) {
      return res.send('Enter Your First Name');
   }
   if (!lastname) {
      return res.send('Enter Your Last Name');
   }
   if (!email) {
      return res.send('Enter Your Email');
   }
   if (!password) {
      return res.send('Enter Your Password');
   }

   // creating hash password then sending in mongodb
   bcrypt.hash(password, saltRounds, function (err, hash) {
      // posting new users in mongodb
      const users = new userList({
         firstname: firstname,
         lastname: lastname,
         email: email,
         password: hash,
         token: token
      })
      users.save()
      emailVerify(email)

   });

   res.send(newUser);
});

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
})