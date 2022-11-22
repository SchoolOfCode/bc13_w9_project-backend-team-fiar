import express from "express";
import * as bootcampersModel from "../models/bootcampers.js";

export const bootcampersRouter = express.Router();

bootcampersRouter.get("/", async function (req, res) {
  const bootcampers = await bootcampersModel.getAllBootcampers();

  res.status(200).json({
    success: true,
    payload: bootcampers,
  });
});