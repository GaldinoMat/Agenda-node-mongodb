require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const routes = require("./routes");
const path = require("path");
const {
  globalMiddleware,
  checkCSRFError,
  csrfMiddleware,
} = require("./src/middlewares/middleware");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const helmet = require("helmet");
const csurf = require("csurf");

// Using ensures route safety
app.use(helmet());

// Connects to MongoDB database
mongoose
  .connect(process.env.CONNECTIONSTRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((result) => {
    app.emit("ready");
  })
  .catch((err) => {});

// required to see and use POST requests' bodies
app.use(express.urlencoded({ extended: true }));

// Use static template on public folder
app.use(express.static(path.resolve(__dirname, "public")));

const sessionOptions = session({
  secret: "akasdfj0út23453456+54qt23qv  qwf qwer qwer qewr asdasdasda a6()",
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
});
app.use(sessionOptions);
app.use(flash());

// Ensure that routes and requests are valid by isuing a token to them
app.use(csurf());

// Custom middlewares
// Using a global middleware
app.use(globalMiddleware);
app.use(checkCSRFError);
app.use(csrfMiddleware);
// Set which routes to use for each part of the website
app.use(routes);

// Set views template to render html on client side browser
app.set("views", path.resolve(__dirname, "src", "views"));
// Set view engine
app.set("view engine", "ejs");

// Waits for the database connection's signal, then starts server
app.on("ready", () => {
  // Starts server
  app.listen(3000, () => {
    console.log("Acessing http://localhost:3000");
    console.log("Server started");
  });
});
