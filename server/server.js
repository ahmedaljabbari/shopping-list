const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/api');
//const path = require('path');

const app = express();

app.use(bodyParser.json());


// connection to the DB -------------------------------------------------
const DBconnection = "mongodb+srv://ahmed:boats1105@cluster0.opieo.mongodb.net/Handla?retryWrites=true&w=majority";
mongoose.connect(DBconnection, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Seccessfully connected to the DB");
  })
  .catch((err) => {
    console.log(err);
}); 

const port = process.env.PORT || 1337; 

app.listen(port, () => {
  console.log("listening ok");
});

mongoose.set('useFindAndModify', false);

//app.use(express.static(__dirname + '/../build'));
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');


app.use(router);
