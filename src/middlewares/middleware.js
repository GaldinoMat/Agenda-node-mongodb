exports.globalMiddleware = (req, resp, next) => {
  resp.locals.errors = req.flash("errors");
  resp.locals.success = req.flash("success");
  resp.locals.user = req.session.user;
  next();
};

exports.checkCSRFError = (err, req, resp, next) => {
  if (err) {
    return resp.render("404");
  }

  next();
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};
