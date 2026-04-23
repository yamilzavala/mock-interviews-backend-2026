const express = require('express')
const router = express.Router();

const {
    getPosts,
    getPosts2,
} = require('../../controllers/infiniteScroll/post.controller');

//get posts
router.get('/', getPosts2)

module.exports = router;