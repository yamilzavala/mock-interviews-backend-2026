// const redisClient = require('./redis') // asumimos ya conectado

const USERS_DB = Array.from({ length: 100000 }, (_, i) => ({
  id: i + 1,
  name: `user_${i + 1}`,
  age: 20 + (i % 50)
}))

// helpers
const encodeCursor = (id) => String(id)
const decodeCursor = (cursor) => Number(cursor)

// pipeline: validation + cache + filter + order + pagination + save cache + response
const searchUsers = async (req, res) => {
  try {
    let {
      search = '',
      sortKey = 'id',
      sortDir = 'asc',
      cursor = 0,
      limit = 5
    } = req.query

    limit = Number(limit)

    // 🔒 validación
    if (limit < 1 || limit > 50) {
      return res.status(400).json({ error: 'Invalid limit' })
    }

    // 🔥 cache key (IMPORTANTE)
    // const cacheKey = `users:${search}:${sortKey}:${sortDir}:${cursor || 'start'}:${limit}`
    // const cached = await redisClient.get(cacheKey)
    // if (cached) {
    //   return res.json(JSON.parse(cached))
    // }

    let result = USERS_DB

    // 🔎 FILTER
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(u =>
        u.name.toLowerCase().includes(q)
      )
    }

    // 🔀 SORT
    result = [...result].sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]

      if (typeof aVal === 'string') {
        return sortDir === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal)
      }

      return sortDir === 'asc'
        ? aVal - bVal
        : bVal - aVal
    })

    // pagination
    result = result?.filter((u) => u.id > cursor);
    const data = result.slice(0, limit)

    // metadata
    const nextCursor = data ? data[data.length - 1].id : null;
    const hasMore = result.length > data.length;

    const response = {
      data,
      pagination: {
        nextCursor,
        hasMore
      }
    }

    // 🔥 CACHE SET (TTL)
    // await redisClient.setEx(cacheKey, 60, JSON.stringify(response))

    return res.json(response)
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

module.exports = {
    searchUsers
}