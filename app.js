require('dotenv').config()
const express = require('express')
const app = express()
// const port = 3000
// ^ moved port to .env

// async context because some of what is happening inside iife uses async context
;(async () => {
  // this means all of remaining endpoints will have parsed json bodies
  // req.body (parsed json data & easier to use)
  app.use(express.json())

  // under controllers, there is auth
  const auth = require('./controllers/Auth')
  // this auth controller gets registered with the app
  app.use('/auth', auth)

  // rinse/repeat above (see above auth notes)
  const post = require('./controllers/Post')
  app.use('/post', post)

  // spinning up app & listening on the port
  app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`)
  })
})()
