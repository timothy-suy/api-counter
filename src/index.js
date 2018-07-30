const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const initialCount = 1234

io.origins('*:*')
io.on('connection', (client) => {
  //emit random addition of 1-5 appointments
  let count = initialCount
  client.on('subscribeToAppointmentService', (interval) => {
    setInterval(() => {
      client.emit('appointmentCount', {
        'enterprise': 'some_enterprise',
        'count': count,
      })
      count += Math.floor((Math.random() * 5) + 1)
    }, interval)
  })
})

const port = 8084
http.listen(port, function(){
  console.log('listening on *:', port);
});