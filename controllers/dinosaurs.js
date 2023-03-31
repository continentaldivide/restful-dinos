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
  let dinos = readDinos();
  if (req.query.dinoFilter) {
    dinos = dinos.filter((dino) => {
      // compare lower case strings for case insensitivity
      console.log(dino);
      return dino.name
        .toLowerCase()
        .includes(req.query.dinoFilter.toLowerCase());
    });
  }
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

router.get("/edit/:id", (req, res) => {
  let dinosaurs = fs.readFileSync("./dinosaurs.json");
  let dinoData = JSON.parse(dinosaurs);
  res.render("dinos/edit", {
    dino: dinoData[req.params.id],
    id: req.params.id,
  });
});

// PUT /dinosaurs/:id -- PUT/PATCH new info from edit form to dino

router.put("/:id", (req, res) => {
  let dinosaurs = fs.readFileSync("./dinosaurs.json");
  let dinoData = JSON.parse(dinosaurs);

  // change name and type property of chosen dino to values from edit form
  dinoData[req.params.id].name = req.body.name;
  dinoData[req.params.id].type = req.body.type;

  // save edited dino
  fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinoData));

  // redirect back to dino index
  res.redirect("/dinosaurs");
});

// DELETE /dinosaurs/:id -- DELETE a single dino @ :id
router.delete("/:id", (req, res) => {
  const dinos = readDinos();
  dinos.splice(req.params.id, 1);
  fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinos));
  res.redirect("/dinosaurs");
});

module.exports = router;
