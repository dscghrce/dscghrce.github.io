document.addEventListener('DOMContentLoaded', function() {
	let qrcode = new QRCode('qr', {
		text: window.location,
		width: 128,
		height: 128,
		colorDark: '#000000',
		colorLight: '#ffffff',
		correctLevel: QRCode.CorrectLevel.H
	})

	// imagesLoaded('#certificate', function() {})
})

function printCertificate() {
	let opt = {
		margin: 5,
		filename: 'certificate.pdf',
		image: { type: 'jpeg', quality: 0.98 },
		html2canvas: { scale: 2 },
		jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
	}
	html2pdf()
		.set(opt)
		.from(document.getElementById('certificate'))
		.save()
}
