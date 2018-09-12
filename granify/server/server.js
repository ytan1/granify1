var express = require('express')
var app = express()
var http = require('http').Server(app)
const io = require('socket.io')(http)
var models = require('./model.js')
var Item = models.itemModel
var Record = models.recordModel
var STARTTIME = 1536771314639
var bodyparser = require('body-parser')
// const cookieparser = require('cookie-parser')

// app.use(cookieparser())
app.use(bodyparser.json())

//should be stored in db. Lets first assume the server will run forever
var addRecord = 0
var deleteRecord = 0
Record.findOne({}, function(err, doc){
    if(!doc){
        var onlyRecord = new Record({add: 0, del: 0})
        onlyRecord.save(function(saveErr, doc2){
            if(saveErr) throw saveErr
            else console.log('Create the first statistic record')
        })
    }
})
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
            Record.findOneAndUpdate({}, {$inc: {add: 1}}, {new: true}, function(err2, doc2){
                if(err2) { 
                    res.json({code: 1, msg: 'Update statistic fail'})
                    throw err2 
                }else if(doc2){
                    io.emit('add', { record: doc2.add, time: (Date.now() - STARTTIME)/3600000 + 1})
                    res.json({code: 0})
                }else{
                    res.json({code: 1, msg: 'Update statistic fail2'})
                }  
            })
            
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
            Record.findOneAndUpdate({}, {$inc: {del: 1}}, {new: true}, function(err2, doc2){
                if(err2) { 
                    res.json({code: 1, msg: 'Update statistic fail'})
                    throw err2 
                }else if(doc2){
                    io.emit('delete', { record: doc2.del, time: (Date.now() - STARTTIME)/3600000 + 1})
                    res.json({code: 0})
                }else{
                    res.json({code: 1, msg: 'Update statistic fail2'})
                }  
            })
        }
    })
}) 

io.on('connection', function(socket){
    console.log('one user connected', socket.id)
    Record.findOne({}, function(err2, doc2){
        if(err2) { 
            
            throw err2 
        }else if(doc2){
            socket.emit('add', { record: doc2.add, time: (Date.now() - STARTTIME)/3600000 + 1})
            socket.emit('delete', { record: doc2.del, time: (Date.now() - STARTTIME)/3600000 + 1})
            
        }else{
            console.log('Fetch statistic fail')
        }  
    })
    
})

const PORT = 3030
http.listen(PORT, function(){
    console.log(`Listening at PORT ${PORT}`)
})