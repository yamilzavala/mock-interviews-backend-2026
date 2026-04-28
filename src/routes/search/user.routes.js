const express = require('express')
const rateLimit = require('express-rate-limit')
// const RedisStore = require('rate-limit-redis')
// const redisClient = require('../../redisClient')

const router = express.Router()

// express rate limit config
const searchLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 min
    max: 30, // max 30 req by IP
    message: {
        error: 'Too many requests, please try again later'
    },
    standardHeaders: true, // => agrega headers al response RateLimit-Limit, RateLimit-Remaining, RateLimit-Reset
    legacyHeaders: false // => evita mandar headers viejos: X-RateLimit-Limit, X-RateLimit-Remaining...
})

// redis rate limit config 
// const searchLimiterRedis = rateLimit({
//   windowMs: 60 * 1000,
//   max: 30,
//   standardHeaders: true,
//   legacyHeaders: false,

//   store: new RedisStore({
//     sendCommand: (...args) => redisClient.sendCommand(args),
//   }),
// });

const {
    getUsers,
    searchUsers
} = require('../../controllers/search/user.controller') 

// GET /api/users
router.get('/', getUsers)
router.get('/search', searchLimiter, searchUsers)

module.exports = router;