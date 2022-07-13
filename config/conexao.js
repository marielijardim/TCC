const mongoose = require('mongoose')
const uri = "mongodb://mari:<password>mari0206"

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedtopology: true })

module.exports = mongoose 