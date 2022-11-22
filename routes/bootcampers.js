import express from 'express'
import * as bootcampersModel from '../models/bootcampers.js'

export const bootcampersRouter = express.Router()

bootcampersRouter.get('/', async function (req, res) {
  const bootcampers = await bootcampersModel.getAllBootcampers()

  res.status(200).json({
    success: true,
    payload: bootcampers
  })
})

bootcampersRouter.get('/:id', async function (req, res) {
  const id = Number(req.params.id)
  const bootcamper = await bootcampersModel.getBootcamperByID(id)

  res.status(200).json({
    success: true,
    payload: bootcamper
  })
})

bootcampersRouter.post('/', async function (req, res) {
  console.log(req.body)
  const newBootcamper = req.body
  const result = await bootcampersModel.createUser(newBootcamper)
  res.status(201).json({ success: true, payload: result })
})

bootcampersRouter.patch('/:id', async function (req, res) {
  const id = Number(req.params.id)
  const data = req.body
  const result = await bootcampersModel.updateBootcamper(id, data)
  res.json({ success: true, payload: result })
})

bootcampersRouter.delete('/:id', async function (req, res) {
  const id = Number(req.params.id)
  const result = await bootcampersModel.deleteBootcamper(id)
  res.json({ success: true, payload: result })
})
