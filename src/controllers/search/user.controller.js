// const redisClient = require('../../redisClient')

//mock DB
const USERS_DB = Array.from({length: 1000}, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@test.com`,
}))

// GET all users
const getUsers = async (req, res) => {
    res.json(USERS_DB)
}

// query → scoring → filtering → sorting → pagination → response
const searchUsers = async (req, res) => {
    try {
        const {q, limit = 10, cursor = 0} = req.query;

        //validations
        const parsedLimit = Number(limit);
        if(isNaN(parsedLimit) || parsedLimit <= 0 || parsedLimit > 50) {
            return res.status(400).json({
                error: 'Invalid limit, must be a number between 1 and 50'
            })
        }

        const parsedCursor = Number(cursor)
        if(isNaN(parsedCursor) || parsedCursor < 0) {
            return res.status(400).json({
                error: 'Invalid cursor, must be a positive number'
            })            
        }

        //adge case: query vacio
        if(!q || !q.trim()) {
            return res.status(200).json({
                data: [],
                pagination: {
                    nextCursor: null,
                    hasMore: false,
                }
            })
        }

        // cache
        // const cacheKey = `search:${q}:${parsedCursor}:${parsedLimit}`
        // const cached = await redisClient.get(cacheKey)
        // if(cached) {
        //     res.status(200).json(JSON.parse(cached))
        // }

        // scoring reemplaza a filter simple (3 match exacto, 2 empieza con, 1 contiene )
        const normalizedQuery = q.toLowerCase();
        const scored = USERS_DB
        .map((user) => {
            const name = user.name.toLowerCase()
            let score = 0;

            if(name === normalizedQuery) score = 3;
            else if(name.startsWith(normalizedQuery)) score = 2;
            else if(name.includes(normalizedQuery)) score = 1;

            return {...user, score}
        })
        .filter((user) => user.score > 0)
        .sort((a,b) => b.score - a.score)

        // pagination
        let startIdex = 0;
        if(parsedCursor > 0) {
            const cursorIndex = scored.findIndex(item => item.id === parsedCursor);
            
            if(cursorIndex === -1) {
                return res.status(400).json({
                    error: 'Invalid cursor, not found in current result set'
                })
            }

            startIdex = cursorIndex + 1;
        }
        const end = startIdex + parsedLimit;
        const data = scored.slice(startIdex, end)

        //metadata
        const nextCursor = data.length ? data[data.length - 1].id : null;
        const hasMore = end < scored.length;
        const total = scored.length;

        const response = {
            data,
            pagination: {
                nextCursor,
                hasMore,
                total
            }
        }

        // cache save
        // await redisClient.setEx(cacheKey, 60, JSON.stringify(response))

        res.status(200).json(response)
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal server error'});
    }
}

module.exports = {
    getUsers,
    searchUsers
}