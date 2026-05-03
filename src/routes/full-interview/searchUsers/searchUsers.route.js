const express = require('express')
const router = express.Router()

const {searchUsers} = require('../../../controllers/full-interview/searchUsers/searchUsers.controller')

router.get('/', searchUsers)

module.exports = router;