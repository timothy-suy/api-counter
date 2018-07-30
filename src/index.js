const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const path = require('path')

const port = 8084

let clients = []

//debug: up count to 5555 on GET https://team.skedify.io/counter/
app.get('/', function (req, res) {
  clients.forEach(function (client) {
    client.emit('appointmentCount', {
      'enterprise': 'some_enterprise',
      'count': 5555,
    })
  })
  res.status(201).send({});
})

io.origins('*:*')
io.on('connection', (client) => {
  let initialCount = 2500
  client.on('subscribeToAppointmentService', () => {
    client.emit('appointmentCount', {
      'enterprise': 'some_enterprise',
      'count': initialCount,
    })
  })
  clients.push(client)
})

http.listen(port, function () {
  console.log('listening on *:', port)
})