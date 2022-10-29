const { db } = require("../db");
const asyncWrapper = require("../middleware/asyncWrapper");

const addPet = asyncWrapper(async (req, res) => {
  const userId = req.userId;
  const { name, gender, birthday, weight, speciesId } = req.body;
  if (!req.body || !name || !gender || !birthday || !speciesId) {
    return res.status(400).json({ status: 400, msg: "Some values are empty." });
  }

  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1); // capitalize name

  // creates a pet in db
  const pet = await db.pet.create({
    data: {
      name: capitalizedName,
      gender: gender,
      birthday: birthday,
      // weight: weight,
      speciesId: parseInt(speciesId),
      ownerId: userId,
    },
  });

  return res.status(201).json({ status: 201, pet: pet });
});

const getPet = asyncWrapper(async (req, res) => {
  const petId = parseInt(req.params.petId);
  const userId = parseInt(req.userId);

  try {
    const pet = await db.pet.findFirst({
      where: {
        id: petId,
        ownerId: userId,
      },
      include: {
        reminders: true,
      },
    });
    if (pet === null) {
      return res.status(404).json({ status: 404, msg: "pet not found." });
    }
    res.status(200).json({ status: 200, pet: pet });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Something went wrong..." });
  }
});

const getPets = asyncWrapper(async (req, res) => {
  const userId = parseInt(req.userId);
  try {
    const pets = await db.pet.findMany({
      where: {
        ownerId: userId,
      },
      include: {
        reminders: true,
      },
    });
    if (pets === null) {
      return res.status(404).json({ status: 404, msg: "no pets found." });
    }
    res.status(200).json({ status: 200, pets: pets });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Something went wrong on db" });
  }
});

const deletePet = asyncWrapper(async (req, res) => {
  const petId = parseInt(req.params.petId);
  const userId = parseInt(req.userId);

  try {
    const pet = await db.pet.findFirst({
      where: {
        id: petId,
        ownerId: userId,
      },
    });

    if (!pet)
      return res.status(404).json({
        status: 404,
        msg: "Pet not found or you are not authorized",
      });

    await db.pet.delete({
      where: {
        id: petId,
      },
    });

    return res
      .status(204)
      .json({ status: 204, msg: "Pet has been deleted successfully." });
  } catch (error) {
    console.log(error);
    console.log("userId: ", userId);
    console.log("petId: ", petId);
    return res
      .status(500)
      .json({ status: 500, msg: "Something went wrong with db" });
  }
});

module.exports = { addPet, getPet, getPets, deletePet };
