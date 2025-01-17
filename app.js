const express = require('express');
const app = express();
const path = require("path");
const port = 3000;
const body_parser = require("body-parser")

// Database setup wuth mongodb

const mongoose = require('mongoose');
// MongoDB URI with authentication details
const url = 'mongodb://shubham_8441:shubhamshivani@127.0.0.1:27017/dancersKart?authSource=admin';
// Connect to MongoDB
mongoose.connect(url)
  .then(() => {
    console.log('Connected to MongoDB! shubham');
  })
  .catch((err) => {
    console.error('Connection error:', err);
  });

// Define schema
const dancersSchema = new mongoose.Schema({
  my_name: String,
  my_age:Number,
  my_contact:Number,
  my_email:Number,
});

// Define the model
const dancers = mongoose.model('dancer', dancersSchema);




    
    







app.use("/static" , express.static("static"))   //For  serving static files
app.use(express.urlencoded())

//PUG SPECIFIC STUFF
app.set("view engine" , "pug")  //set the template engine as pug
app.set("views" , path.join(__dirname , "views") ) //set the views directory

//our pug demo endpoint
app.get('/', (req, res) => {
  res.status(200).render("home.pug")})

  app.get('/contact', (req, res) => {
  res.status(200).render("contact.pug")})
  
  app.post('/contact', (req, res) => {
    var mydata = new dancers(req.body);
    mydata.save().then(()=>{
      res.send("Your responses have been submitted and our team will contact you soon!")
    }).catch(()=>{
      res.status(404).send("your responses have not been submitted")
    })})
  //res.status(200).render("contact.pug")})
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })