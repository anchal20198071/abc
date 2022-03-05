import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import { v4 } from "uuid"
import {Server} from 'socket.io'
import http from 'http'


//cofiguration
const app = express()
const server = http.createServer(app)
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
const io = new Server(server);
//creating database connection and creating a database for the project
mongoose.connect("mongodb://localhost:27017/miniProject", () => {
    console.log("DB Connected!")
})

//creating user schema, coz to create any model we first need to create schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

//creating model
const User = new mongoose.model("User", userSchema);

//Routes
//Login API
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    User.findOne({email:email}, (err, user)=>{
        if(user){
            //check password
            if(user.password === password){
                res.send({message: "Login Successful", user: user})
            }
            else{
                res.send({message: "Password Incorrect!"});
            }
        }
        else{
            res.send({message: "User is NOT Registered."})
        }
    })
})

//Register API
app.post("/register", (req, res) => {
    //we have sent user object in body of request
    const { name, email, password } = req.body;

    User.findOne({ email: email }, (err, user) => {
        if (user) {
            res.send({ message: "User already Registered" });
        }
        else {
            //creating a mongoDB user
            const user = new User({
                name: name,
                email: email,
                password: password
            });

            //saving the user into database, here we are taking a callback function inside save(), in case any error occurs
            user.save(err => {
                if (err) {
                    res.send(err)
                }
                else {
                    res.send({ message: "Registered Successfully! Please Login Now." });
                }
            })
        }
    })

})

//create-new-room api
app.post("/create-new-room", (req, res) => {
    const id= v4();
    // res.send({message: "A room created with id: "+id, id});
    res.send(id);
})

//socket connection code

io.on("connection", (socket) => {
    console.log("User online");
  
    // receive a message from the client
    socket.on('get-document', documentId=>{
        const data="";
        socket.join(documentId);
        socket.emit('load-document', data);

        socket.on('canvas-data', (data)=>{
            socket.broadcast.to(documentId).emit('canvas-data', data);
        });
    })

    
  });

server.listen(9002, () => {
    console.log("Backend Started at 9002");
})
