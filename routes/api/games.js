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