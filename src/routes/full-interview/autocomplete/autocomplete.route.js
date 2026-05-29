const express = require('express')
const router = express.Router()

const {
  autocompleteUsers,
} = require('../../../controllers/full-interview/autocomplete/autocomplete.controller')

router.get('/users', autocompleteUsers)

module.exports = router