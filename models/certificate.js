var mongoose = require('mongoose')
var Schema = mongoose.Schema
var moment = require('moment')

var CertificateSchema = new Schema(
	{
		name: {
			type: String,
			default: ''
		},
		event: {
			type: String,
			default: ''
		},
        email: {
            type: String,
			default: ''
        },
		incharge: {
			name: {
				type: String,
				default: ''
			}
		},
		date: {
			type: Date
		}
	},
	{
		toObject: {
			virtuals: true
		},
		toJSON: {
			virtuals: true
		}
	}
)


CertificateSchema.virtual('dateFormatted').get(function() {
	return moment(this.date, 'DD MMM YYYY').format('DD MMM YYYY')
})

module.exports = mongoose.model('Certificate', CertificateSchema)
