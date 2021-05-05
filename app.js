const express = require("express");
var exphbs = require("express-handlebars");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 5000;
const pathname = path.join(__dirname, "public");

// set handlebars middleware
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// set routes
app.get("/", function (req, res) {
  res.render("home");
});

// set static folder
app.use(express.static(pathname));
//
app.listen(PORT, () => console.log("server running on port: " + PORT));
