// BUILD YOUR SERVER HERE
const express = require("express")
const db = require("./users/model")

const server = express()
server.use(express.json())

server.get ("/", (req,res)=>{
    res.json({message:"hello world"})
})
server.post("/users",(req, res)=>{
    const newUser = db.insert({
        id: db.shortid,
        name:req.body.name,
        bio:req.body.bio,
    })
    if(!req.body.name || !req.body.bio){
        res.status(400).json({message:"Please provide name and bio for the user"})
    }
    res.status(201).json(newUser)
})
server.get ("/users", (req, res)=>{
    const users = db.find()
    users.then((user)=>{
        res.json(user) 
    })
    .catch(()=>{
        res.status(500).json({message:"The user information could not be retrieved"})
        
    })
})
server.get ("/users/:id", (req, res)=>{
    const users = db.findById(req.params.id)
    users.then((user)=>{
        if(req.params.id){res.json(user)}
        else{res.status(404).json({message:"The user with the specified id does not exist"})}
    })
    .catch(()=>{
        res.status(500).json({message:"The user information could not be retrieved"})
        
    })
})
server.delete("/users/:id", (req, res)=>{
    const users = db.remove(req.params.id)
    users.then((user)=>{
        if(req.params.id){res.json(user)}
        else{res.status(404).json({message:"The user with the specified id does not exist"})}
    })
    .catch(()=>{
        res.status(500).json({message:"The user could not be removed"})
        
    })
})
server.put("/users/:id", (req, res)=>{
    const {id} = req.params
    const {name,bio}=req.body
    const users = db.update(id,req.body)
    users.then((user)=>{
        if(!id){res.status(404).json({message:"The user with the specified ID does not exist"})}
        else if(!name || !bio){res.status(400).json({message:"Please provide name and bio for the user"})}
        else if (id && name && bio){res.status(200).json(user)}
    })
    .catch(()=>{
        res.status(500).json({message:"The user could not be removed"})
        
    })
})
// made a woopsie



module.exports = server; // EXPORT YOUR SERVER instead of {}
