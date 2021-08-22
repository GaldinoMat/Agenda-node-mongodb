exports.initialPage = (req, res, next) => {
  // Renders a answer on the client side server
  res.render("index", {
    title: "This is the <span style='color:red;'>page's</span> title",
    numbers: [0, 1, 2, 3, 4, 5],
  });
};

exports.postHomeForm = (req, resp) => {
  // Sends a request
  resp.send(req.body);
};
