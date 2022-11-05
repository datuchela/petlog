const { db } = require("../db");
const asyncWrapper = require("../middleware/asyncWrapper");

const getSpecies = asyncWrapper(async (req, res) => {
  try {
    const species = await db.species.findMany();
    if (!species) return res.status(404).json({ msg: "No species found" });
    return res.status(200).json({ species: species });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Something went wrong with db." });
  }
});

const addSpecies = asyncWrapper(async (req, res) => {
  if (!req.body.name)
    return res.status(400).json({ msg: "No name provided for species" });
  try {
    const species = await db.species.create({
      data: {
        name: req.body.name,
      },
    });
    return res.status(201).json({ species: species });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Something went wrong on db." });
  }
});

module.exports = { getSpecies, addSpecies };
