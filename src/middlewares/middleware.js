exports.globalMiddleware = (req, resp, next) => {
  resp.locals.globalMiddlewareVar = "Test";
  next();
};

exports.checkCSRFError = (err, req, resp, next) => {
  if (err) {
    return resp.render("404");
  }
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};
