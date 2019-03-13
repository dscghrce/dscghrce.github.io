var Certificate = require('../models/certificate')

exports.certificates_get = (req, res) => {
	Certificate.find({ event: req.params.event }).sort('name').exec((err, result) => {
		if (err) return res.status(500).send(err)

		if (result) return res.render('certificates', { certificates: result })

		return res.send(false)
	})
}

exports.certificate_get = (req, res) => {
	Certificate.findById(req.params.id).exec((err, result) => {
		if (err) {
			if (err.name == 'CastError') return res.render('certificate', { certificate: false })

			return res.status(500).send(err)
        }
        
		if (result) return res.render('certificate', { certificate: result })

		return res.send(false)
	})
}
