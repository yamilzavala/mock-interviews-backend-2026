// const redis = require('../../../redisClient');

const posts = Array.from({length: 1000000}, (_, idx) => ({
    id: idx + 1,
    title: `post ${idx + 1}`
}) )

// get posts => page base => GET /posts?page=1&limit=20&query=facere
const getPosts = async (req, res) => {
    const {page = 1, limit = 20, query = ''} = req.query;

    const pageNum = Number(page)
    const limitNum = Number(limit)

    //filter
    const filtered = posts.filter(item => 
        item.title?.toLowerCase().includes(query.toLowerCase())
    )

    //paginate
    const start = (pageNum - 1) * limitNum;
    const end = start + limitNum;
    const data = filtered.slice(start, end)

    res.status(200)
        .json({
            data,
            pagination: {
                nextPage: pageNum + 1,
                hasMore: filtered.length > end,
                total: filtered.length
            }
        }
    )
}

//cursor-base => GET /posts?cursor=20?limit=20&query=react
/** 
 * Para evitar duplicados:
 * WHERE id > cursor
 * ORDER BY id ASC
 * LIMIT 20
*/
const getPosts2 = async (req, res) => {
    const {limit = 20, cursor, query = ''} = req.query;

    const cursorNum = Number(cursor) // ultimo id recibido
    const limitNum = Number(limit)
    const normalizedQuery = String(query).toLowerCase();

    // cache key
    const cachekey = `posts:${query}:${cursorNum}:${limitNum}`

    // try cache
    // const cached = await redis.get(cachekey)
    // if(cached) {
    //     return res.status(200).json(JSON.parse(cached))
    // }
    
    //filter
    let filtered = posts;

    if(query) {
        filtered = posts.filter(item => 
            item.title?.toLowerCase().includes(normalizedQuery))
    }
        
    let startIndex = 0;
    if(cursorNum) {
        startIndex = filtered.findIndex(item => item.id === cursorNum) + 1;
    }

    //paginate
    const end = startIndex + limitNum;
    const data = filtered.slice(startIndex, end)

    //matadata
    const nextCursor = data.length ? data[data.length - 1].id : null;
    const hasMore = end < filtered.length;
    const total = filtered.length;

    const response = {
        data,
        nextCursor,
        hasMore,
        total
    }

    // save cache (TTL 60s)
    //await redis.setEx(cachekey, 60, JSON.stringify(response))

    res.status(200).json(response)
}

module.exports = {
    getPosts,
    getPosts2
}