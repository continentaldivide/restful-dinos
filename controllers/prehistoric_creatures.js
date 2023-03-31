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
  let prehistoricCreatures = readPrehistoricCreatures();
  if (req.query.prehistoricCreatureFilter) {
    prehistoricCreatures = prehistoricCreatures.filter(
      (prehistoricCreature) => {
        // compare lower case strings for case insensitivity
        console.log(prehistoricCreatures);
        return prehistoricCreature.type
          .toLowerCase()
          .includes(req.query.prehistoricCreatureFilter.toLowerCase());
      }
    );
  }
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
  fs.writeFileSync(
    "./prehistoric_creatures.json",
    JSON.stringify(prehistoricCreatures)
  );
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

router.get("/edit/:id", (req, res) => {
  const prehistoricCreatures = readPrehistoricCreatures();
  res.render("prehistoric_creatures/edit", {
    creature: prehistoricCreatures[req.params.id],
    id: req.params.id,
  });
});

// PUT route for /prehistoric_creatures:id to UPDATE a specific creature

router.put("/:id", (req, res) => {
  const prehistoricCreatures = readPrehistoricCreatures();

  // change name and type property of chosen dino to values from edit form
  prehistoricCreatures[req.params.id].type = req.body.type;
  prehistoricCreatures[req.params.id].img_url = req.body.img_url;

  // save edited dino
  fs.writeFileSync(
    "./prehistoric_creatures.json",
    JSON.stringify(prehistoricCreatures)
  );

  // redirect back to dino index
  res.redirect("/prehistoric_creatures");
});

// DELETE route for /prehistoric_creatures/:id to DESTROY a specific creature

router.delete("/:id", (req, res) => {
  const prehistoricCreatures = readPrehistoricCreatures();
  prehistoricCreatures.splice(req.params.id, 1);
  fs.writeFileSync(
    "./prehistoric_creatures.json",
    JSON.stringify(prehistoricCreatures)
  );
  res.redirect("/prehistoric_creatures");
});

module.exports = router;
