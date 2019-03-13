const mongoose = require('mongoose')
const moment = require('moment')
const csv = require('csv-parser')
const fs = require('fs')
const config = require('dotenv').config()

const Certificate = require('../models/certificate')

const DBPORT = process.env.MONGODB_URI

async function generateCertificates(event, incharge, date, csvconf) {
	await mongoose.connect(DBPORT, err => {
		if (err) throw err
		console.log('Connected to DB.')
	})

	mongoose.Promise = global.Promise
	var db = mongoose.connection
	db.on('error', console.error.bind(console, 'MongoDB connection error:'))

	let certificates = []

	console.log(`Generating certificates for ${event}...`)

	fs.createReadStream(csvconf.csvpath)
		.pipe(csv())
		.on('data', data => {
			let newCertificate = new Certificate({
				name: data[csvconf.namefield].toUpperCase(),
				event: event,
				email: data[csvconf.emailfield],
				incharge: { name: incharge },
				date: new moment(date, 'YYYY/MM/DD')
			})
			certificates.push(newCertificate)
		})
		.on('end', () => {
			Certificate.insertMany(certificates, (err, result) => {
				if (err) throw err
				mongoose.disconnect()
				console.log(`Generated ${result.length} certificates for ${event}.`)
			})
		})
}

// Sample Usage -----
// generateCertificates('Game Development Workshop', 'Krushn Dayshmookh', '2019/03/09', { csvpath: __dirname + '/gd.csv', namefield: 'Name', emailfield: 'Username' })

exports.generateCertificates = generateCertificates
