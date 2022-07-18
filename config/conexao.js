const mongoose = require('mongoose')
const uri = "mongodb://mari:mari0206@ac-t9z9cxu-shard-00-00.gg9rckm.mongodb.net:27017,ac-t9z9cxu-shard-00-01.gg9rckm.mongodb.net:27017,ac-t9z9cxu-shard-00-02.gg9rckm.mongodb.net:27017/?ssl=true&replicaSet=atlas-xtcsbd-shard-0&authSource=admin&retryWrites=true&w=majority"

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedtopology: true })

module.exports = mongoose 