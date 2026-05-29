const express = require('express')

const router = express.Router()

const {
  like,
  unlike
} = require('../../../controllers/full-interview/likes/likes.controller')

router.put('/posts/:postId/like', like)

router.delete('/posts/:postId/like', unlike)

module.exports = router