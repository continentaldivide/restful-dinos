const express = require("express");
const methodOverride = require("method-override");
const fs = require("fs");
const app = express();
const PORT = 8001;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(methodOverride("_method"));

app.use("/dinosaurs", require("./controllers/dinosaurs"));
app.use(
  "/prehistoric_creatures",
  require("./controllers/prehistoric_creatures")
);

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(PORT, () => {
  console.log("oh hi port " + PORT + ", I didn't see you there");
});
