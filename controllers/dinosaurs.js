const express = require("express");
const router = express.Router();
const fs = require("fs");

const readDinos = () => {
  const dinosaurs = fs.readFileSync("./dinosaurs.json");
  const dinoData = JSON.parse(dinosaurs);
  return dinoData;
};

// GET /dinosaurs -- READ return an array of dinos
router.get("/", (req, res) => {
  const dinos = readDinos();
  res.render("dinos/index", {
    dinos,
  });
});

// GET /dinosaurs/new -- show a form to make a new dinosaur
router.get("/new", (req, res) => {
  res.render("dinos/new.ejs");
});

// POST /dinosaurs -- CREATE a new dino in the db
router.post("/", (req, res) => {
  console.log(req.body);
  const dinos = readDinos();
  dinos.push(req.body);
  fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinos));
  res.redirect("/dinosaurs");
});

// GET /dinosaurs/:id -- READ a single dino @ :id
router.get("/:id", (req, res) => {
  // read the dino json data
  const dinos = readDinos();
  // lookup one dino using the req.params
  const thisDino = dinos[req.params.id];
  // render the details template
  res.render("dinos/details.ejs", {
    dino: thisDino,
    id: req.params.id,
  });
});

module.exports = router;
