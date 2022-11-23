import express from 'express'
import morgan from 'morgan'
import { bootcampersRouter } from './routes/bootcampers.js'
import { postsRouter } from './routes/posts.js'
import { commentsRouter } from './routes/userComments.js'
import cors from 'cors'
const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use('/api/bootcampers', bootcampersRouter)
app.use('/api/posts', postsRouter)
app.use('/api/comments', commentsRouter)

app.use(function (req, res, next) {
  res.status(404).json({
    success: false,
    error:
        "We couldn't find what you were looking for 😞. Did you send the request to the right path?"
  })
})

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    error: 'Something went wrong, please try again later'
  })
})

export default app
