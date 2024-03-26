import mongoose from 'mongoose';

const GamesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  agerating: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description:{
    type: String,
    required: true
  }
});

const Game = mongoose.model('Game', GamesSchema);
// module.exports = Game = mongoose.model('Game', GamesSchema);
export default Game;














// //used a boiler plate, ignore these
// //fruitSchema
// const fruitSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   age: {
//     type: Number,
//     min: 0,
//     required: true,
//   },
//   readyToEat: {
//     type: Boolean,
//     required: true,
//   },
// });

// export default mongoose.model('Fruits', fruitSchema);
