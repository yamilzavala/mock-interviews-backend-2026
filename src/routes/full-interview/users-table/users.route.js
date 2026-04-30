const express = require('express')
const router = express.Router()

const {getUsersTable} = require('../../../controllers/full-interview/users-table/users.controller')

router.get('/', getUsersTable)

module.exports = router;