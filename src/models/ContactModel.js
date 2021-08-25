const mongoose = require("mongoose");
const validator = require("validator");

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: false, default: "" },
  email: { type: String, required: false, default: "" },
  number: { type: String, required: false, default: "" },
  createdAt: { type: Date, default: Date.now },
});

const ContactModel = mongoose.model("Contact", ContactSchema);

class Contact {
  //#region MongoDB functions tips
  // const ContactModel = require("../models/ContactModel");
  //
  // Creates an object on MongoDB server
  // ContactModel.create({
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
  // Fetches all objects in database collection
  // ContactModel.find()
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
    this.contact = null;
  }

  async register() {
    this.validate();

    if (this.errors.length > 0) return;

    this.contact = await ContactModel.create(this.body);
  }

  validate() {
    // "Cleans" the data, making sure it is a string
    this.cleanUpData();

    // Validation functions
    // Checks if name exists in name field
    if (!this.body.name) this.errors.push("Name field is required");
    // e-mail needs to be valid (contain an @ character)
    if (this.body.email && !validator.isEmail(this.body.email))
      this.errors.push("Invalid e-mail");
    // Checks if any of the contact info fields are filled
    if (!this.body.email && !this.body.number)
      this.errors.push(
        "You need to add at least one of the following fields to add a contact: e-mail or phone number"
      );
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
      name: this.body.name,
      surname: this.body.surname,
      email: this.body.email,
      number: this.body.number,
    };
  }

  static async searchById(id) {
    if (typeof id !== "string") return;

    // Gets ContactModel id from database
    const contact = await ContactModel.findById(id);

    return contact;
  }

  async edit(id) {
    if (typeof id !== "string") return;

    this.validate();

    if (this.errors.length > 0) return;
    this.contact = await ContactModel.findByIdAndUpdate(id, this.body, {
      new: true,
    });
  }

  static async searchContacts() {
    // Gets all ContactModel's contacts from database
    const contacts = await ContactModel.find().sort({ name: -1 });

    return contacts;
  }

  static async deleteContact(id) {
    if (typeof id !== "string") return;
    // Gets ContactModel contact from database and delete it
    const contact = await ContactModel.findByIdAndDelete({ _id: id });

    return contact;
  }
}

module.exports = Contact;
