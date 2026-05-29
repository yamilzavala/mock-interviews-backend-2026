const {
  likePost,
  unlikePost
} = require('../../../services/full-interview/likes/likes.service')

const like = async (req, res) => {

  try {

    const { postId } = req.params

    // fake auth
    const userId = 99

    const result = likePost(postId, userId)

    return res.json(result)

  } catch (err) {

    return res.status(500).json({
      message: 'Internal server error'
    })
  }
}

const unlike = async (req, res) => {

  try {

    const { postId } = req.params

    // fake auth
    const userId = 99

    const result = unlikePost(postId, userId)

    return res.json(result)

  } catch (err) {

    return res.status(500).json({
      message: 'Internal server error'
    })
  }
}

module.exports = {
  like,
  unlike
}