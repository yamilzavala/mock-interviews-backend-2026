// USERS_DB mock
const USERS_DB = Array.from({length: 1000}, (_, i) => ({
    id: Math.floor(i/2) + 1,
    name: `user_${Math.floor(i/2) + 1}`,
    role: Math.floor(i / 3) % 2 === 0 ? 'admin' : 'user',
}))

const deduplicateUsers = require('./utils/deduplicateUsers')
//const redisClient = require('../../../../redisClient')

// query params + cache + deduple + search filtering + role filtering + pagination + response + cache save
const getUsersTable = async (req, res) => {
    try {
        // query params
        let {search = '', limit = 10, role = '', page = 1} = req.query;

        //normalized
        search = search.toLowerCase()
        limit = Number(limit)
        page = Number(page)

        //cache
        // const cacheKey = `users:${search}:${role}:${page}:${limit}`
        // const cached = await redisClient.get(cacheKey)
        // if(cached) {
        //     return res.status(200).json(JSON.parse(cached))
        // }

        // deduple
        let result = deduplicateUsers(USERS_DB)

        // filtering
        if(search){
            result = result.filter((user) => user.name.toLowerCase().includes(search))
        }

        if(role){
            result = result.filter((user) => user.role === role)
        }

        // pagination
        const start = (page - 1) * limit;
        const end = start + limit;
        const data = result.slice(start, end);

        // metadata
        const total = result.length;
        const totalPages = Math.ceil(total/limit)

        const response = {
            data,
            pagination: {
                total,
                totalPages,
                limit,
                page
            }
        }

        // cache save
        //await redisClient.setEx(cacheKey, 60, JSON.stringify(response))

        res.status(200).json(response)
    } catch (error) {
        console.error(error)
        req.status(500).json({error: 'Internal server error'})
    }
}

module.exports = {
    getUsersTable
}

