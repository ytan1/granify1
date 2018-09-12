const mongoose = require('mongoose')
const DB_url = 'mongodb://127.0.0.1:27017'
mongoose.connect(DB_url)

const models = {
    item:{
        name: {type:String, require:true},
        phone: {type: String, require: true}
    }
}

module.exports = {
    itemModel: mongoose.model('Item', new mongoose.Schema(models['item']))
}