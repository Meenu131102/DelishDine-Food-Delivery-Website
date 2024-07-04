var express = require("express")
var bodyparser=require("body-parser")
var mongoose = require("mongoose")

const app=express()

app.use(bodyparser.json());
app.use(express.static('public'))
app.use(bodyparser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/signup')
var db = mongoose.connection
db.on('error',()=>console.log("Error in connecting to database"))
db.once('open',()=>console.log("Connected to database"))

app.post("/sign_up",(req,res) => {
    var name = req.body.name
    var mobile = req.body.mobile
    var email = req.body.email
    var password = req.body.password

    var data = {
        "name":name,
        "mobile":mobile,
        "email":email,
        "password":password
    }
    db.collection('users').insertOne(data,(err,collection)=> {
        if(err){
            throw err
        }
        console.log("Record Inserted Successfully")
    })
    return res.redirect('index.html')
})

app.get("/",(req,res) => {
    res.set({"Access-Control-Allow-Origin":"*"

    })
    return res.redirect('signup.html')
}).listen(3019);

console.log("Listening on post 3019")