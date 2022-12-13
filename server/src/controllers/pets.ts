import { prisma } from "../prisma";
import asyncWrapper from "../middleware/asyncWrapper";
import type { Request, Response } from "express";

interface RequestWithUserId extends Request {
  userId: string;
}

export const addPet = asyncWrapper(async (req: RequestWithUserId, res: Response) => {
  const userId = req.userId;
  const { name, gender, birthday, weight, speciesId } = req.body;
  if (!req.body || !name || !gender || !birthday || !speciesId) {
    return res.status(400).json({ msg: "Some values are empty." });
  }

  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1); // capitalize name

  // creates a pet in db
  const pet = await prisma.pet.create({
    data: {
      name: capitalizedName,
      gender: gender,
      birthday: birthday,
      // weight: weight,
      speciesId: parseInt(speciesId),
      ownerId: parseInt(userId),
    },
  });

  return res.status(201).json({ pet: pet });
});

export const getPet = asyncWrapper(async (req: RequestWithUserId, res: Response) => {
  const petId = parseInt(req.params.petId);
  const userId = parseInt(req.userId);
  try {
    const pet = await prisma.pet.findFirst({
      where: {
        id: petId,
        ownerId: userId,
      },
      include: {
        reminders: true,
      },
    });
    if (pet === null) {
      return res.status(404).json({ msg: "pet not found." });
    }
    return res.status(200).json({ pet: pet });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Something went wrong..." });
  }
});

export const getPets = asyncWrapper(async (req: RequestWithUserId, res: Response) => {
  const userId = parseInt(req.userId);
  try {
    const pets = await prisma.pet.findMany({
      where: {
        ownerId: userId,
      },
      include: {
        reminders: true,
      },
    });
    if (pets === null) {
      return res.status(404).json({ msg: "no pets found." });
    }
    res.status(200).json({ pets: pets });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Something went wrong on db" });
  }
});

export const deletePet = asyncWrapper(async (req: RequestWithUserId, res: Response) => {
  const petId = parseInt(req.params.petId);
  const userId = parseInt(req.userId);

  try {
    const pet = await prisma.pet.findFirst({
      where: {
        id: petId,
        ownerId: userId,
      },
    });

    if (!pet)
      return res.status(404).json({
        msg: "Pet not found or you are not authorized",
      });

    await prisma.pet.delete({
      where: {
        id: petId,
      },
    });

    return res.status(200).json({ msg: "Pet has been deleted successfully." });
  } catch (error) {
    console.log(error);
    console.log("userId: ", userId);
    console.log("petId: ", petId);
    return res.status(500).json({ msg: "Something went wrong with db" });
  }
});
