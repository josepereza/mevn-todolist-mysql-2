var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')

var tasks = require('./routes/tasks')
var cors = require('cors')
const axios = require('axios')

var port = 3000

var app = express()
app.use(cors())
app.use(express.static('public'));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api', tasks)

app.listen(port, function() {
  console.log('Server started on port ' + port)
})
