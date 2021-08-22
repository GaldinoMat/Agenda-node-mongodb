const express = require("express");
const route = express.Router();
const homeController = require("./src/controllers/homeController");
const contactUsController = require("./src/controllers/contactUsController");

// Home routes
route.get("/", homeController.initialPage);
route.post("/", homeController.postHomeForm);

// Contact routes
route.get("/contact-us", contactUsController.initialPage);

// Exports route to server script
module.exports = route;
