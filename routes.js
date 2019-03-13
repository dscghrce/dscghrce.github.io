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

// Certificates -----

const certificateController = require('./controllers/certificateController')

router.get('/certificates/:event', certificateController.certificates_get)

router.get('/certificates', (req, res) => res.redirect('/events'))

router.get('/certificate/:id', certificateController.certificate_get)

// Testing -----

module.exports = router
