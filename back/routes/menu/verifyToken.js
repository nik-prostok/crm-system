const verify = require('../../controllers/verify')

module.exports = function(app) {
	app.post('/api/verifyToken', verify, (req, res) => {
        res.json({
            success: true
        })
    })
}