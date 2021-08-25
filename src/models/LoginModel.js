const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const LoginModel = mongoose.model("Login", LoginSchema);

class Login {
  //#region MongoDB functions tips
  // const LoginModel = require("../models/LoginModel");
  //
  // Creates an object on MongoDB server
  // LoginModel.create({
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
  // LoginModel.find()
  //   .then((result) => {
  //     console.log(`Fetched ${result} from database`);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  //#endregion

  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async register() {
    this.validate();

    if (this.errors.length > 0) return;

    await this.checkUserInDatabase();

    if (this.errors.length > 0) return;

    // Generates a salt and encrypts password based on it
    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);

    // Creates the user in database
    this.user = await LoginModel.create(this.body);
  }

  async login() {
    this.validate();

    // Request to find user in database
    if (this.errors.length > 0) return;
    this.user = await LoginModel.findOne({ email: this.body.email });

    if (!this.user) {
      this.errors.push("User does not exist");
      return;
    }

    // Compares request and user password's hash
    if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
      this.errors.push("Invalid password");
      this.user = null;
      return;
    }
  }

  validate() {
    // "Cleans" the data, making sure it is a string
    this.cleanUpData();

    // Validation functions
    // e-mail needs to be valid (contain an @ character)
    if (!validator.isEmail(this.body.email)) this.errors.push("Invalid e-mail");
    // Password needs to have between 8 and 20 characters
    if (this.body.password.length < 8 || this.body.password.length > 20)
      this.errors.push("Password needs to have between 8 and 20 characters");
  }

  cleanUpData() {
    // Checks object keys for strings
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }

    // Sets object keys as "cleaned up" data
    this.body = {
      email: this.body.email,
      password: this.body.password,
    };
  }

  async checkUserInDatabase() {
    // Checks if the user is in MongoDB database
    this.user = await LoginModel.findOne({ email: this.body.email });

    if (this.user) this.errors.push("User already exists");
  }
}

module.exports = Login;
