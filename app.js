const express = require("express");
var exphbs = require("express-handlebars");
const app = express();
const path = require("path");
const request = require("request");

const PORT = process.env.PORT || 5000;
const pathname = path.join(__dirname, "public");

const getData = (stockData) => {
  request(
    "https://cloud.iexapis.com/stable/stock/fb/quote?token=pk_ceaa65e7fce44e3d8c417d707ca0d5d6",
    { json: true },
    (err, res, body) => {
      if (err) {
        return console.log(err);
      }

      if (res.statusCode === 200) {
        console.log(body);
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

// set static folder
app.use(express.static(pathname));
//
app.listen(PORT, () => console.log("server running on port: " + PORT));
