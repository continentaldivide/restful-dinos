const express = require("express");
const router = express.Router();
const fs = require("fs");

const readPrehistoricCreatures = () => {
  const prehistoricCreatures = fs.readFileSync("./prehistoric_creatures.json");
  const prehistoricCreatureData = JSON.parse(prehistoricCreatures);
  return prehistoricCreatureData;
};

// GET /prehistoric_creatures -- READ return an array of prehistoric creatures
router.get("/", (req, res) => {
  const prehistoricCreatures = readPrehistoricCreatures();
  res.render("prehistoric_creatures/index", {
    prehistoricCreatures,
  });
});

// GET /prehistoric_creatures/new -- show a form to make a new prehistoric creature
router.get("/new", (req, res) => {
  res.render("prehistoric_creatures/new.ejs");
});

// POST /prehistoric_creatures -- CREATE a new prehistoric creature in the db
router.post("/", (req, res) => {
  console.log(req.body);
  const prehistoricCreatures = readPrehistoricCreatures();
  prehistoricCreatures.push(req.body);
  fs.writeFileSync("./prehistoric_creatures.json", JSON.stringify(prehistoricCreatures));
  res.redirect("/prehistoric_creatures");
});

// GET /prehistoric_creatures/:id -- READ a single prehistoric creature @ :id
router.get("/:id", (req, res) => {
  // read the dino json data
  const prehistoricCreatures = readPrehistoricCreatures();
  // lookup one dino using the req.params
  const thisPrehistoricCreature = prehistoricCreatures[req.params.id];
  // render the details template
  res.render("prehistoric_creatures/details.ejs", {
    prehistoricCreature: thisPrehistoricCreature,
    id: req.params.id,
  });
});

module.exports = router;
