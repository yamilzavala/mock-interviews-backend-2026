const likes = new Map()

/*
Map<
  postId,
  Set<userIds>
>

Ejemplo:

{
   1 => Set(10, 20, 30)
}
*/

const getOrCreatePostLikes = (postId) => {

  if (!likes.has(postId)) {
    likes.set(postId, new Set())
  }

  return likes.get(postId)
}

const likePost = (postId, userId) => {

  const postLikes = getOrCreatePostLikes(postId)

  // idempotente
  postLikes.add(userId)

  return {
    liked: true,
    likesCount: postLikes.size
  }
}

const unlikePost = (postId, userId) => {

  if (!likes.has(postId)) {

    return {
      liked: false,
      likesCount: 0
    }
  }

  const postLikes = likes.get(postId)

  postLikes.delete(userId)

  return {
    liked: false,
    likesCount: postLikes.size
  }
}

module.exports = {
  likePost,
  unlikePost
}