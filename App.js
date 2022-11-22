import { Express } from 'express'
import morgan from 'morgan'
import bootcampers from './routes/bootcampers.js'
import posts from './routes/posts.js'
import userComments from './routes/userComments.js'
const app = Express

app.use(morgan('dev'))
app.use(Express.json())
app.use('/api/bootcampers', bootcampers)
app.use('/api/posts', posts)
app.use('/api/userComments', userComments)

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
