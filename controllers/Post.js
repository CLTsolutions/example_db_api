let express = require('express')
let router = express.Router()
const { Post, User } = require('../models')

router.post('/create/', async (req, res) => {
   let message
   try {
      let u = await User.findOne({ where: { id: req.body.id } })
      if (u) {
         let post = await Post.create({ content: req.body.content })
         await u.addPost(post)

         // have to use post id to grab post after adding it
         let { id, content } = await Post.findOne({ where: { id: post.id } })
         message = { message: 'Post made!', data: { id, content } }
      } else {
         message = {
            message: "Can't make a post, user does not exist",
            data: null,
         }
      }
   } catch (err) {
      message = { message: 'Post Create Failed', err }
   }

   res.json(message)
})

router.get('/all/:id', async (req, res) => {
   // get all posts for user where id matches (i.e user 1)
   let u = await User.findOne({ where: { id: req.params.id } })
   let posts = u ? await u.getPosts() : []
   if (posts) {
      // nesting fn calls is common
      // -- uncommented below cleans up nested code for readability
      //   res.send(
      //      posts.map(p => {
      //         const { id, content } = p
      //         return { id, content }
      //      })
      //   )

      // for all the posts, I only care about content and id
      // - not returning unnecessary data
      let cleaned_posts = posts.map(p => {
         const { id, content } = p
         return { id, content }
      })

      res.send(cleaned_posts)
   } else res.send(posts)
})

module.exports = router
