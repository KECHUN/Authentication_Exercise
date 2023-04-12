//jshint esversion:6
require("dotenv").config();
const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/userDB");
const encrypt = require("mongoose-encryption");

const userSchema = new mongoose.Schema ({
  email: String,
  password: String
});


userSchema.plugin(encrypt,{secret:process.env.SECRET, encryptedFields:["password"]});
const User = mongoose.model("User", userSchema);

app.post("/register", function(req, res){

    const user = new User ({
      email: req.body.username,
      password: req.body.password
    });
  
    user.save();

    res.render("secrets"); 

    });

app.post("/login", function(req, res){

    
    const userEmail = req.body.username;
    const userPassword = req.body.password;
    run()
    async function run(){
    const foundUser = await User.findOne({email:userEmail});
    if(foundUser && foundUser.password === userPassword){
        res.render("secrets");
    }
        }
    
    });
    

app.get("/",function(req,res){
    res.render("home")
})

app.get("/login",function(req,res){
    res.render("login")
})

app.get("/register",function(req,res){
    res.render("register")
})










app.listen(process.env.PORT||3000,function(){
    console.log("Server is running on port 3000.")
});