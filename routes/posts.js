import express from 'express'
import * as postsModel from '../models/posts.js'

//export 
const postsRouter = express.Router()

export default postsRouter.get('/', async function (req, res) {
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
    if ((req.query.content == undefined) && (req.query.week == undefined)) {
        const posts = await postsModel.getAllPosts()
  
        res.status(200).json({
            success: true,
            payload: posts
        })
    }
  })

