// fake database
const USERS_DB = Array.from(
  { length: 10000 },
  (_, i) => ({
    id: i + 1,
    name: `user_${i + 1}`,
    email: `user${i + 1}@test.com`,
  })
)

// in-memory cache
const cache = new Map()

const autocompleteUsers = async (req, res) => {
  try {
    let {
      limit = 10,
      cursor = 0,
      search = '',
    } = req.query

    // normalization
    limit = Number(limit)
    cursor = Number(cursor)

    // validation
    if (
      isNaN(limit) ||
      limit < 1 ||
      limit > 50
    ) {
      return res.status(400).json({
        error: 'Limit must be between 1 and 50',
      })
    }

    if (isNaN(cursor) || cursor < 0) {
      return res.status(400).json({
        error: 'Cursor must be a positive number',
      })
    }

    // empty query - min chars
    if (!search.trim() || search.trim().length < 2) {
      return res.status(200).json({
        data: [],
        pagination: {
          hasMore: false,
          nextCursor: null,
          total: 0,
        },
      })
    }

    const normalizedSearch = search.toLowerCase()

    // cache
    const cacheKey = `${normalizedSearch}-${limit}-${cursor}`
    if (cache.has(cacheKey)) {
      return res.status(200).json(cache.get(cacheKey))
    }

    // scoring
    const scoredUsers = USERS_DB.map((user) => {
      let score = 0

      const normalizedName = user.name.toLowerCase()

      if (normalizedName === normalizedSearch) {
        score = 3
      } else if (normalizedName.startsWith(normalizedSearch)) {
        score = 2
      } else if (normalizedName.includes(normalizedSearch)) {
        score = 1
      }

      return {
        ...user,
        score,
      }
    })
      .filter((user) => user.score > 0)
      .sort((a, b) => b.score - a.score)

    // cursor pagination
    const filteredResults = scoredUsers.filter((user) => user.id > cursor)
    const data = filteredResults.slice(0,limit)
    const nextCursor = data.length
      ? data[data.length - 1].id
      : null

    const hasMore = filteredResults.length > data.length

    const response = {
      data,
      pagination: {
        hasMore,
        nextCursor,
        total: filteredResults.length,
      },
    }

    // save cache
    cache.set(cacheKey, response)

    res.status(200).json(response)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      error: 'Internal server error',
    })
  }
}

module.exports = {
  autocompleteUsers,
}