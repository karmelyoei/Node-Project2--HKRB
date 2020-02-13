const express = require("express");
const request = require("request");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "public")));

let inputs;
app.use((req, res, next) => {
  if (req.path.includes("search")) {
    inputs = req.path.split("=")[1];
    const url = `https://www.googleapis.com/books/v1/volumes?q=${inputs}`;
    request.get(url, (error, response, body) => {
      response = JSON.parse(response.body);
      res.send(response);
    });
  } else {
    next();
  }
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.use((req, res) => {
  res.status(404).send("Page not found 404");
});

// check server errors
app.use((error, req, res, next) => {
  res.status(500).send("internal server error");
  next();
});

app.listen(3000, () => {
  console.log("This server is running");
});
