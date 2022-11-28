import app from './App.js'

const port = process.env.PORT ?? 3000

app.listen(port, () => {
  console.log(`Server is now listening on http://localhost:${port}`)
})
