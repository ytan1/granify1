const mongoose = require('mongoose')
const DB_url = 'mongodb://127.0.0.1:27017'
mongoose.connect(DB_url)

const models = {
    item:{
        name: {type:String, require:true},
        phone: {type: String, require: true}
    },
    record:{
        add: {type: Number, default: 0},
        del: {type: Number, default: 0}
    }
}

module.exports = {
    itemModel: mongoose.model('Item', new mongoose.Schema(models['item'])),
    recordModel: mongoose.model('Record', new mongoose.Schema(models['record']))
}