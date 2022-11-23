import express from 'express'
import * as commentsModel from '../models/userComments.js'

export const commentsRouter = express.Router()

commentsRouter.get('/', async function (req, res) {
  const posts = await commentsModel.getAllComments()

  res.status(200).json({
    success: true,
    payload: posts
  })
})

commentsRouter.get('/:id', async function (req, res) {
  const id = Number(req.params.id)
  const comment = await commentsModel.getCommentByPostID(id)

  res.status(200).json({
    success: true,
    payload: comment
  })
})

commentsRouter.post('/', async function (req, res) {
  const newComment = req.body
  const result = await commentsModel.createComment(newComment)
  res.status(201).json({ success: true, payload: result })
})

commentsRouter.patch('/:id', async function (req, res) {
  const id = Number(req.params.id)
  const data = req.body
  const result = await commentsModel.updateComment(id, data)
  res.json({ success: true, payload: result })
})

commentsRouter.delete('/:id', async function (req, res) {
  const id = Number(req.params.id)
  const result = await commentsModel.deletePost(id)
  res.json({ success: true, payload: result })
})
