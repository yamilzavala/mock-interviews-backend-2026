//const redisClient = require('../../../../redisClient')

//USERS_BD
const USERS_BD = Array.from({length: 10000}, (_, i) => ({
    id: i + 1,
    name: `user_${i+1}`,
    email: `user${i+1}@test.com`,
}))

// queryParamethers + normalization + validation && border cases + cache + scored && filter && order + pagination && metadata + save chas + response
const searchUsers = async (req, res) => {
    try {
        let {limit = 10, cursor = 0, search = ''} = req.query;

        //normalization
        limit = Number(limit)
        cursor = Number(cursor)

        // validation +  border
        if(isNaN(limit) || limit < 1 || limit > 50) {
            return res.status(400).json({error: 'Limit must be between 1 and 50'})
        }

        if(isNaN(cursor) || cursor < 0) {
            return res.status(400).json({error: 'Cursor must be greater than 0'})
        }
        
        if(!search || !search.trim()){
            return res.status(200).json({
                data: [],
                pagination: {
                    hasmore: false,
                    cursor: null,
                    total: 0
                }
            })
        }

        // cache
        // const cacheKey = `search:${search}:${limit}:${cursor}`
        // const cached = await redisClient.get(cacheKey)
        // if (cached) {
        //     return res.status(200).json(JSON.parse(cached))
        // }

        // scoring
        const scoring = USERS_BD
        .map((user) => {
            let score = 0;
            const name = user.name.toLowerCase()
            const searchNormalized = search.toLowerCase()

            if(name === searchNormalized) score = 3;
            if(name.startsWith(searchNormalized)) score = 2;
            if(name.includes(searchNormalized)) score = 1;

            return {...user, score}
        })
        .filter((user) => user.score > 0)
        .sort((a,b) => b.score - a.score)

        // pagination
        const results = scoring.filter((u) => u.id > cursor)
        const data = results.slice(0, limit)

        // matadata
        const nextCursor = data ? [data.length - 1].id : null;
        const total = results.length;
        const hasMore = results.length > limit;

        const response = {
            data,
            pagination: {
                hasMore,
                total,
                nextCursor
            }
        }

        // cache save
        // await redisClient.setEx(cacheKey,60, JSON.stringify(response))

        res.status(200).json(response)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Internal server error'})
    }
}

module.exports = {
    searchUsers
}