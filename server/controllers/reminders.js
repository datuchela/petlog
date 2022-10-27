const { db } = require("../db");
const asyncWrapper = require("../middleware/asyncWrapper");

const addReminder = asyncWrapper(async (req, res) => {
  if (
    !req.body ||
    !req.body.petId ||
    !req.body.name ||
    !req.body.upcoming ||
    !req.body.intervalValue ||
    !req.body.intervalType
  ) {
    console.log(req.body);
    return res.status(400).json({ status: 400, msg: "Some values are empty." });
  }
  const userId = req.userId;
  try {
    const pet = await db.pet.findFirst({
      where: {
        ownerId: userId,
        id: parseInt(req.body.petId),
      },
    });
    if (!pet) return res.status(404).json({ status: 404, msg: "Not found" });
    const reminder = await db.reminder.create({
      data: {
        name: req.body.name,
        upcoming: req.body.upcoming,
        intervalValue: parseInt(req.body.intervalValue),
        intervalType: req.body.intervalType,
        petId: pet.id,
        userId: userId,
      },
    });
    return res.status(201).json({ status: 201, reminder: reminder });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: 500, msg: "Something went wrong with db" });
  }
});

const deleteReminder = asyncWrapper(async (req, res) => {
  const userId = parseInt(req.userId);
  const reminderId = parseInt(req.params.reminderId);
  try {
    const reminder = await db.reminder.findFirst({
      where: {
        id: reminderId,
        userId: userId,
      },
    });

    if (!reminder)
      return res.status(404).json({
        status: 404,
        msg: "Reminder not found or you are not authorized",
      });

    await db.reminder.delete({
      where: {
        id: reminderId,
      },
    });

    return res
      .status(204)
      .json({ status: 204, msg: "Reminder has been deleted successfully." });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: 500, msg: "Something went wrong with db" });
  }
});

module.exports = { addReminder, deleteReminder };
