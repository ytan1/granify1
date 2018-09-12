var express = require('express')
var app = express()
var http = require('http').Server(app)
const io = require('socket.io')(http)
var models = require('./model.js')
var Item = models.itemModel;
var bodyparser = require('body-parser')
// const cookieparser = require('cookie-parser')

// app.use(cookieparser())
app.use(bodyparser.json())

//should be stored in db. Lets first assume the server will run forever
var addRecord = 0
var deleteRecord = 0
var startTime = Date.now()

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/item', function(req, res){
    console.log(req.body)
    var name = req.body.name
    var phone = req.body.phone
    var itemInstance = new Item({name, phone})
    itemInstance.save(function(err, doc){
        if(err) {
            console.log(err)
            res.json({code: 1})
        }
        else{
            addRecord++
            io.emit('add', { record: addRecord, time: (Date.now() - startTime)/3600000 + 1})
            res.json({code: 0})
        }
    })
})
app.get('/item', function(req, res){
    Item.find({}, function(err, docs){
        if(err){ throw err }
        else{ 
            console.log(docs)
            res.json({code: 0, items: docs}) 
        }
    })
})
app.post('/delete', function(req, res){
    console.log(req.body)
    Item.deleteOne({_id: req.body.id}, function(err){
        if(err) {throw err}
        else { 
            deleteRecord++
            io.emit('delete', { record: deleteRecord, time: (Date.now() - startTime)/3600000 + 1})
            res.json({code: 0}) 
        }
    })
})

io.on('connection', function(socket){
    console.log('one user connected', socket.id)
    socket.emit('add', { record: addRecord, time: (Date.now() - startTime)/3600000 + 1})
    socket.emit('delete', { record: deleteRecord, time: (Date.now() - startTime)/3600000 + 1})
})
const PORT = 3030
http.listen(PORT, function(){
    console.log(`Listening at PORT ${PORT}`)
})