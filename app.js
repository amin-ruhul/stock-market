const express = require("express");
var exphbs = require("express-handlebars");
const app = express();
const path = require("path");
const request = require("request");
var bodyParser = require("body-parser");

const PORT = process.env.PORT || 5001;
const pathname = path.join(__dirname, "public");

app.use(bodyParser.urlencoded({ extended: false }));

const getData = (stockData, query = "fb") => {
  request(
    "https://cloud.iexapis.com/stable/stock/" +
      query +
      "/quote?token=" +
      process.env.API_KEY,
    { json: true },
    (err, res, body) => {
      if (err) {
        return console.log(err);
      }

      if (res.statusCode === 200) {
        //console.log(body);
        //return body;
        stockData(body);
      }
    }
  );
};

// set handlebars middleware
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// set routes
app.get("/", function (req, res) {
  getData((data) => {
    res.render("home", {
      stockInfo: data,
    });
  });
});

app.get("/about", function (req, res) {
  res.render("about");
});

// post route

app.post("/", function (req, res) {
  getData((data) => {
    //query = req.body.keyword;
    res.render("home", {
      stockInfo: data,
    });
  }, req.body.keyword);
});

// set static folder
app.use(express.static(pathname));
//
app.listen(PORT, () => console.log("server running on port: " + PORT));
