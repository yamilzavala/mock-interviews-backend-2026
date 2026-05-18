const express = require('express')
const router = express.Router()

const { searchUsers } = require('../../../controllers/full-interview/dataTable/dataTable.controller')

router.get('/', searchUsers)

module.exports = router;