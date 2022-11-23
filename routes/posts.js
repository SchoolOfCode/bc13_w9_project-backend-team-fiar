import express from 'express'
import * as postsModel from '../models/posts.js'

export const postsRouter = express.Router()

postsRouter.get('/', async function (req, res) {
  if (req.query.week !== undefined) {
    console.log(req.query.week)
    const posts = await postsModel.searchPostsByWeek(req.query.week)
    res.json({
      success: true,
      payload: posts
    })
  }
  if (req.query.content !== undefined) {
    const posts = await postsModel.searchPostsByContent(req.query.content)
    res.status(200).json({
      success: true,
      payload: posts
    })
  }
  if ((req.query.content === undefined) && (req.query.week === undefined)) {
    const posts = await postsModel.getAllPosts()

    res.status(200).json({
      success: true,
      payload: posts
    })
  }
})

postsRouter.post('/', async function (req, res) {
  const newPost = req.body
  const result = await postsModel.createPost(newPost)
  res.status(201).json({ success: true, payload: result })
})

postsRouter.patch('/:id', async function (req, res) {
  const id = Number(req.params.id)
  const data = req.body
  const result = await postsModel.updatePost(id, data)
  res.json({ success: true, payload: result })
})

postsRouter.delete('/:id', async function (req, res) {
  const id = Number(req.params.id)
  const result = await postsModel.deletePost(id)
  res.json({ success: true, payload: result })
})
