const mongoose = require("mongoose");

const HomeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
});

const HomeModel = mongoose.model("Home", HomeSchema);

class Home {
  //#region MongoDB functions tips
  // const HomeModel = require("../models/HomeModel");
  //
  // Creates an object on MongoDB server
  // HomeModel.create({
  //   title: "My test object title 3",
  //   description: "My test object description 3",
  // })
  //   .then((result) => {
  //     console.log(`Created ${result} object`);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  //
  // Fetches all object in database collection
  // HomeModel.find()
  //   .then((result) => {
  //     console.log(`Fetched ${result} from database`);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  //#endregion
}

module.exports = Home;
