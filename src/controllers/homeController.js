const Contact = require("../models/ContactModel");

exports.index = async (req, res, next) => {
  const contacts = await Contact.searchContacts();
  // Renders a answer on the client side server
  res.render("index", { contacts });
};
