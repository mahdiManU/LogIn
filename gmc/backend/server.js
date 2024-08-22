const express = require('express')  // on a ramener les bibs 
const mongoose = require('mongoose') 
const bodyParser = require('body-parser')
const cors = require('cors')
const uri = require('./uri')
const user = require('./user')
/////////////////////////////////
const port = 8000
const app = express()

app.use(cors("http://localhost:3000"))
app.use(bodyParser.json())

mongoose.connect(uri)

app.post('/addUser',async (req,res) =>{
    const { firstName , lastName , email , password } = req.body
    try{
           const newUser = new user({ firstName , lastName , email , password })
           await newUser.save()
           res.status(201).send(newUser)
    }catch(err){
          res.status(400).send(err)
    }

})

app.post('/login',async(req,res) => {
    const {email} = req.body
    try{
         const verif = await user.findOne({email})
        
         if(verif){
           res.status(201).send(verif) 
           console.log(verif)
         }else{
            res.status(201).send("user do not exist") 
         }
         
    }catch(err){
        res.status(400).send(err)
    }
})


app.listen(port,()=>{
    console.log(`server is running in http://localhost:${port}`)
})
