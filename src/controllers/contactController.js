const Contact = require("../models/ContactModel");

exports.index = (req, res) => {
  res.render("contacts", {
    contact: {},
  });
};

exports.register = async (req, res) => {
  try {
    // Instantiates new contact
    const contact = new Contact(req.body);

    // Validates contact info
    await contact.register();

    // Checks for errors, and if they exist, show them in flash messages, stores the session and redirects the user to previous page
    if (contact.errors.length > 0) {
      req.flash("errors", contact.errors);
      req.session.save(() => res.redirect("/contacts/index"));
      return;
    }

    // If there is not errors, a success flash message is stored and session is saved
    req.flash("success", "Contact succesfully registered");
    req.session.save(() => res.redirect("/"));
    return;
  } catch (error) {
    console.log(error);
    // Show 404 page if error occurs
    return res.render("404");
  }
};

exports.editIndex = async (req, res) => {
  if (!req.params.id) return res.render("404");

  const contact = await Contact.searchById(req.params.id);

  if (!contact) return res.render("404");

  res.render("contacts", { contact });
};

exports.edit = async (req, res) => {
  try {
    if (!req.params.id) return res.render("404");

    const contact = new Contact(req.body);

    await contact.edit(req.params.id);

    // Checks for errors, and if they exist, show them in flash messages, stores the session and redirects the user to previous page
    if (contact.errors.length > 0) {
      req.flash("errors", contact.errors);
      req.session.save(() => res.redirect("/contacts/index"));
      return;
    }

    // If there is not errors, a success flash message is stored and session is saved
    req.flash("success", "Contact succesfully updated");
    req.session.save(() => res.redirect("/"));
    return;
  } catch (error) {
    console.log(error);
    res.render("404");
  }
};

exports.delete = async (req, res) => {
  if (!req.params.id) return res.render("404");

  const contact = await Contact.deleteContact(req.params.id);

  if (!contact) return res.render("404");

  req.flash("success", "Contact succesfully deleted");
  req.session.save(() => res.redirect("back"));
  return;
};
