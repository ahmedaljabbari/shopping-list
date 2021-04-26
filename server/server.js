const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/api');
const path = require('path');
const Hamster = require('./model/Hamster');

const app = express();


app.use(bodyParser.json());


// connection to the DB -------------------------------------------------
const DBconnection =  //('mongodb://localhost/dbName');   in case local db
  "mongodb+srv://ahmed:boats1105@cluster0.opieo.mongodb.net/HAMSTERSWARS?retryWrites=true&w=majority";
mongoose
  .connect(DBconnection, { useNewUrlParser: true, useUnifiedTopology: true })
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

app.use(express.static(__dirname + '/../build'));

app.get("/", (req, res) => {
  Hamster.find()
    .sort({ createdAt: -1 })
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});


app.get("/hamster", (req, res) => {
  Hamster.find().then((items) => {
    let id = Math.floor(Math.random() * items.length)
    const pickedItem = items[id]
    res.json(pickedItem);
  })
  .catch((err) => console.log(err))
})

app.use("/api", router);
//app.use("/api/hamsters", router);

//Serve static assets if in production
// if (process.env.NODE_ENV === 'production') {
//   //set static folder
//   app.use(express.static('client/public'));

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   })
// }
