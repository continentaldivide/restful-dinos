const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 8001;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.use("/dinosaurs", require("./controllers/dinosaurs"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

// helper function to read the dino db

const readDinos = () => {
  const dinosaurs = fs.readFileSync("./dinosaurs.json");
  const dinoData = JSON.parse(dinosaurs);
  return dinoData;
};

// // GET /dinosaurs -- READ return an array of dinos
// app.get("/dinosaurs", (req, res) => {
//   const dinos = readDinos();
//   res.render("dinos/index.ejs", {
//     dinos,
//   });
// });

// // GET /dinosaurs/new -- show a form to make a new dinosaur
// app.get("/dinosaurs/new", (req, res) => {
//   res.render("dinos/new.ejs");
// });

// // POST /dinosaurs -- CREATE a new dino in the db
// app.post("/dinosaurs", (req, res) => {
//   console.log(req.body);
//   const dinos = readDinos();
//   dinos.push(req.body);
//   fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinos));
//   res.redirect("/dinosaurs");
// });

// // GET /dinosaurs/:id -- READ a single dino @ :id
// app.get("/dinosaurs/:id", (req, res) => {
//   // read the dino json data
//   const dinos = readDinos();
//   // lookup one dino using the req.params
//   const thisDino = dinos[req.params.id];
//   // render the details template
//   res.render("dinos/details.ejs", {
//     dino: thisDino,
//     id: req.params.id,
//   });
// });

app.listen(PORT, () => {
  console.log("oh hi port " + PORT + ", I didn't see you there");
});
