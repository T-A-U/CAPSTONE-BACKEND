// Imports
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
//import gamesRoutes from "./routes/api/games.js"
import Game from './models/games.mjs';
// import Fruits from 
// TODO: Change all "Fruits" to "Game" in this file (and comment out the old server.mjs, and make a copy, put above the comment and, then edit the copy)
//import fruits from './utilities/data.js';
import games from './utilities/data.js';
import cors from "cors"
import userRoutes from './routes/api/users.js'
import authRoutes from './routes/api/auth.js'

//Configurations
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
await mongoose.connect(process.env.MONGO_URI);

//Middleware
app.use(express.json());
app.use(cors())
app.use('/api/users',userRoutes );
app.use('/api/auth',authRoutes );

//Create Games Database 
app.get('/get', async (req, res) => {
  await Game.deleteMany({});
  await Game.create(games);

  res.send(`Games Database Created`);
});

//Read all Games from Database
app.get('/', async (req, res) => {
  try {
    const allGames = await Game.find({});
    res.json(allGames);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
});

//Get By ID
app.get('/:id', async (req, res) => {
  try {
    const getSingleGame = await Game.findById(
      req.params._id,
    );

    res.json(getSingleGame);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
});


//Create new game
app.post('/', async (req, res) => {
  try {
    console.log('Name', req.body.name)
    console.log(req.body.agerating)
    console.log(req.body.price)
    console.log(req.body.description)
    const createGame = new Game({
      name: req.body.name,
      agerating: req.body.agerating,
      price: req.body.price,
      description: req.body.description,
      }
      );
    await createGame.save();
    res.json(createGame);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
});

//Update
app.put('/:id', async (req, res) => {
  try {
    const updatedGame = await Game.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedGame);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
});

//Delete Game
app.delete('/:id', async (req, res) => {
  try {
    await Game.findByIdAndDelete(req.params.id);

    res.status(200).json({ msg: 'Game Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
});

//Error checking middleware
app.use((err, _req, res, next) => {
  res.status(500).send('There seems to be an error somewhere...');
});

//Listen
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});


// // Imports
// import express from 'express';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// //import gamesRoutes from "./routes/api/games.js"
// import Game from './models/games.mjs';
// //TODO: Change all "Fruits" to "Game" in this file (and comment out the old server.mjs, and make a copy, put above the comment and, then edit the copy)
// import fruits from './utilities/data.js';

// //Configurations
// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 3001;
// await mongoose.connect(process.env.MONGO_URI);

// //Middleware
// app.use(express.json());

// //Routes
// //Seed Routes
// app.get('/seed', async (req, res) => {
//   await Fruits.deleteMany({});
//   await Fruits.create(fruits);

//   res.send(`Database Seeded`);
// });

// //Create
// app.post('/', async (req, res) => {
//   try {
//     let newFruit = new Fruits(req.body);
//     await newFruit.save();

//     res.json(newFruit);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: 'Server Error' });
//   }
// });

// //Read
// app.get('/', async (req, res) => {
//   try {
//     const allFruits = await Fruits.find({});
//     res.json(allFruits);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: 'Server Error' });
//   }
// });

// //Update
// app.put('/:id', async (req, res) => {
//   try {
//     const updatedFruit = await Fruits.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

//     res.json(updatedFruit);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: 'Server Error' });
//   }
// });

// //Delete
// app.delete('/:id', async (req, res) => {
//   try {
//     await Fruits.findByIdAndDelete(req.params.id);

//     res.status(200).json({ msg: 'Item Deleted' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: 'Server Error' });
//   }
// });

// //Error checking middleware
// app.use((err, _req, res, next) => {
//   res.status(500).send('Seems like we messed up somewhere...');
// });

// //Listen
// app.listen(PORT, () => {
//   console.log(`Server is listening on port: ${PORT}`);
// });


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