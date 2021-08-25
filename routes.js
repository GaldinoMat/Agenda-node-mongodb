const express = require("express");
const route = express.Router();
const homeController = require("./src/controllers/homeController");
const loginController = require("./src/controllers/loginController");
const contactController = require("./src/controllers/contactController");

const { loginRequired } = require("./src/middlewares/middleware");

// Home routes
route.get("/", homeController.index);

// Login routes
route.get("/login/index", loginController.index);
route.post("/login/register", loginController.register);
route.post("/login/login", loginController.login);
route.get("/login/logout", loginController.logout);

// Contacts routes
route.get("/contacts/index", loginRequired, contactController.index);
route.post("/contacts/register", loginRequired, contactController.register);
route.get("/contacts/index/:id", loginRequired, contactController.editIndex);
route.post("/contacts/edit/:id", loginRequired, contactController.edit);
route.get("/contacts/delete/:id", loginRequired, contactController.delete);

// Exports route to server script
module.exports = route;
