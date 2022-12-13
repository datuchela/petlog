import { prisma } from "../prisma";
import asyncWrapper from "../middleware/asyncWrapper";
import type { Request, Response } from "express";

export const getSpecies = asyncWrapper(async (req: Request, res: Response) => {
  try {
    const species = await prisma.species.findMany();
    if (!species) return res.status(404).json({ msg: "No species found" });
    return res.status(200).json({ species: species });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Something went wrong with db." });
  }
});

export const addSpecies = asyncWrapper(async (req: Request, res: Response) => {
  if (!req.body.name) return res.status(400).json({ msg: "No name provided for species" });
  try {
    const species = await prisma.species.create({
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
