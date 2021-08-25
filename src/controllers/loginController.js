const Login = require("../models/LoginModel");

exports.index = (req, resp) => {
  if (req.session.user) return resp.render("logged-in")
  resp.render("login");
};

exports.register = async (req, resp) => {
  try {
    // Gets new login attempt
    const login = new Login(req.body);
    // Tries to validate the new login session
    await login.register();

    // Checks for errors, and if they exist, show them in flash messages, stores the session and redirects the user to previous page and
    if (login.errors.length > 0) {
      req.flash("errors", login.errors);
      req.session.save(function () {
        return resp.redirect("/login/index");
      });
      return;
    }
    // If tehre is not errors, a success flash message is stored and session is saved
    req.flash("success", "User was succesfully created");
    req.session.save(function () {
      return resp.redirect("/login/index");
    });
  } catch (error) {
    console.log(error);
    // Show 404 page if error occurs
    return resp.render("404");
  }
};

exports.login = async (req, resp) => {
  try {
    // Gets new login attempt
    const login = new Login(req.body);
    // Tries to validate the new login session
    await login.login();

    // Checks for errors, and if they exist, show them in flash messages, stores the session and redirects the user to previous page and
    if (login.errors.length > 0) {
      req.flash("errors", login.errors);
      req.session.save(function () {
        return resp.redirect("/login/index");
      });
      return;
    }

    // If there is not errors, a success flash message is stored and session is saved
    req.flash("success", "User logged in");

    // Sets the session as user session
    req.session.user = login.user;
    req.session.save(function () {
      return resp.redirect("/login/index");
    });
  } catch (error) {
    console.log(error);
    // Show 404 page if error occurs
    return resp.render("404");
  }
};

exports.logout = (req, resp) => {
  req.session.destroy();
  resp.redirect("/login/index");
};
