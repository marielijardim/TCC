const mongoose = require('mongoose')
const uri = "mongodb://mari:<password>mari0206"

mongoose.connect(uri)

module.exports = mongoose 