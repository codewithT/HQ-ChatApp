require('dotenv').config()
// including env variable into application.
// import user model.
const User = require('./models/user'); 
const cors = require("cors")

const express = require('express')
const app = express()  

app.use(cors())

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
app.use(express.json())
 

const posts = [
    {
        gmail : "tulasirammadaka403@gmail.com",
        title: 'post 1'
    },
    {
        gmail: "tulasi123@gmail.com",
        title: 'post 2'
    },
    
]
const mongoose = require("mongoose")
// mongodb connection:
async function connectToDB(){
  try {
      await mongoose.connect("")

      console.log("success!!!!!!!!!!!!!");
  } catch (error) {
      console.log(error);
      console.log("ERROR!!!!!!!!!!!!!");
  }
}

connectToDB()
const users = [];

app.get('/users', (req, res) =>{

    res.json(users)
})

app.post('/users' ,async (req, res) =>{
   
        const salt =await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password , salt)
        
         const gmail_name = req.body.gmail
        const password =req.body.password
    try{
        const existingUser = await User.findOne({ gmail_name });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        console.log("entered");
    // Create new user
    const username= gmail_name; const password = hashedPassword;
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
     
})

app.post('/users/login' ,async (req, res) =>{
    //const user = users.find(user => user.gmail === req.body.gmail)
    console.log("entering")
    const gmaill = req.body.gmail;
    if(gmaill == null){
        return res.status(400).send('cannot find user')
    }

    try{
        console.log("entering")
        const user_name = await User.findOne({username: gmaill})
        console.log("entered");
        if(!user_name){
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        // for avoiding tining attack
        if(await bcrypt.compare(req.body.password , user_name.password)){
            
            const username = req.body.gmail
            
            console.log("token generated");
            const accessToken = jwt.sign({ userId: User._id, username: User.username },process.env.ACCESS_TOKEN_SECRET )
            
            res.json({ accessToken: accessToken })
        }
        else{
            res.send("notfine")
        }

    }
    catch{
        res.status(500)
    }
   
    
})

// authenticateToken is middleware.
app.get('/posts', authenticateToken, (req, res) =>{
    res.json(posts.filter(post => post.gmail === req.user.name))
})

// req.user.name is accessing name extracted from jwt token.
// filter is used if u logged in as ram it will it posts 

// Authenticating the token:
function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.status(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{
        if(err) return res.status(403)
        req.user = user
        next()
    })
}
app.listen(4000)



