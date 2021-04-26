const express = require("express");
const router = express.Router();
const Hamster = require("../model/Hamster");

router.get("/battle", (req, res) => {
  Hamster.find()
    .then((items) => {
      var el = "",
        el2 = "";
      while (el === el2) {
        el = items[Math.floor(Math.random() * items.length)];
        el2 = items[Math.floor(Math.random() * items.length)];
        if (el != el2) {
          break;
        }
      }
      //console.log([el, el2])
      res.json([el, el2]);
    })
    .catch((err) => console.log(err));
});

router.post("/battle", (req, res) => {
  const id = req.body.id;
  console.log("loser ===>  " + req.body.loser);
  console.log("winner ===>  " + req.body.name);
  Hamster.findOneAndUpdate(
    { name: req.body.name },
    { 
      wins: parseInt(req.body.wins),
      games: parseInt(req.body.games)
    },
    { new: true },
    (error, data) => {
      if (error) {
        console.log(error);
      } else {
        console.log(data);
      }
    }
  ).then(()=>{
    Hamster.findOneAndUpdate({name: req.body.loser}, 
      { 
        defeats: parseInt(req.body.loserDefeats),
        games: parseInt(req.body.loserGames)
      },
    { new: true },
    (error, data) => {
      if (error) {
        console.log(error);
      } else {
        console.log(data);
      }
    }
    )
  })
  res.end();
});

router.get("/result/:id", (req, res) => {
  const id = req.params.id;
  Hamster.findById(id)
    .then((item) => {
      console.log(item);
      res.json(item);
    })
    .catch((err) => console.log(err));
});


router.post("/upload", (req, res) => {
  var age = parseInt(req.body.age);
  Hamster.create({
    name:req.body.name,
    age: age,
    favFood: req.body.favFood,
    loves: req.body.loves,
    wins: 0,
    games: 0,
    defeats: 0,
    imgName: req.body.name + ".jpg"
  }).then((hamster) => {
    console.log(hamster);
    res.json(hamster)
  })
})


router.get('/stats', (req, res) => {
  Hamster.find().then((items) => {
    let totalGames = 0;
    for (let index = 0; index < items.length; index++) {
      totalGames = totalGames + items[index].games;
    }
    const topWinners = items.sort(function (a, b) {
      return b.wins -  a.wins;
    }).slice(0, 5)

    const topLosers = items.sort(function (a, b) {
      return b.defeats -  a.defeats;
    }).slice(0, 5)

    const response = [Math.floor(totalGames/2), topWinners, topLosers]

    console.log(totalGames)
    res.json(response)
  });
})


module.exports = router;
