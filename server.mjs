// Imports
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Fruits from './models/fruitsSchema.mjs';
import fruits from './utilities/data.js';

//Configurations
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
await mongoose.connect(process.env.MONGO_URI);

//Middleware
app.use(express.json());

//Routes
//Seed Routes
app.get('/seed', async (req, res) => {
  await Fruits.deleteMany({});
  await Fruits.create(fruits);

  res.send(`Database Seeded`);
});

//Create
app.post('/', async (req, res) => {
  try {
    let newFruit = new Fruits(req.body);
    await newFruit.save();

    res.json(newFruit);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
});

//Read
app.get('/', async (req, res) => {
  try {
    const allFruits = await Fruits.find({});
    res.json(allFruits);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
});

//Update
app.put('/:id', async (req, res) => {
  try {
    const updatedFruit = await Fruits.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedFruit);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
});

//Delete
app.delete('/:id', async (req, res) => {
  try {
    await Fruits.findByIdAndDelete(req.params.id);

    res.status(200).json({ msg: 'Item Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
});

//Error checking middleware
app.use((err, _req, res, next) => {
  res.status(500).send('Seems like we messed up somewhere...');
});

//Listen
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});



// // ROUTES to edit in
// import express from "express";
// import Game from "../../models/Games.js"
// // import Games from '../../models/Games'

// // const express = require('express');
// const router = express.Router();
// // const Game = require("../../models/Games");
// // const Games = require('../../models/Games');

// console.log("Oh hai")

// //create route
// router.post('/', async (req, res) => {
//     console.log("I'm in / New Route")
//     try {
//         console.log("I'm in / route")
//         let newGame = new Game(req.body)
//         await newGame.save();
        
//         res.json(newGame)
//     } catch (error) {
//         console.error(err.message)
//         res.status(500).send('Server Error')
//     }
// })

// //read route
// router.get('/', async (req, res) => {
//     try {
//         const allGames = await Game.find({});
//         res.json(allGames);

//     } catch (error) {
//         console.error(err.message)
//         res.status(500).send('Server Error')
//     }
// })

// //update route
// router.patch('/:id', async (req, res) => {
//     try {
//         const updatedGame = await Games.findByIdAndUpdate(
//             req.params.id,
//             req.body,
//             {new: true}
//         );

//         res.json(updatedGame);

//     } catch (error) {
//         console.error(err.message)
//         res.status(500).send('Server Error')
//     }
// })

// //delete route
// router.delete('/:id', async (req, res) => {
//     try {
//         await Game.findByIdAndDelete(req.params.id)

//         res.status(200).json({msg: 'Game deleted'});

//     } catch (error) {
//         console.error(err.message)
//         res.status(500).send('Server Error')
//     }
// })

// // module.exports = router;
// export default router;