/* eslint-disable new-cap */
/* eslint-disable capitalized-comments */
var router = require('express').Router()

router.get('/', (req, res) => {
	res.render('index')
})

router.get('/events', (req, res) => {
	res.render('events')
})

router.get('/team', (req, res) => {
	res.render('team')
})

// Testing -----

module.exports = router
