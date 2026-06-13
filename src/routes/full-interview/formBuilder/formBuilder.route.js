const validateForm = require('../../../middlewares/full-interview/formBuilder/validateForm');
const express = require('express')
const router = express.Router()

const {createForm} = require('../../../controllers/full-interview/formBuilder/formBuilder.controller');

router.post('/', validateForm, createForm)

module.exports = router;