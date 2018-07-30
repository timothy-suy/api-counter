const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const initialCount = 1234

io.origins('*:*')
io.on('connection', (client) => {
  client.auth = false
  client.on('authenticate', function (data) {
    console.log(data);
    //check the auth data sent by the client
    checkAuthToken(data.token, function (err, success) {
      if (!err && success) {
        console.log('Authenticated client ', client.id)
        client.auth = true
      }
      else {
        console.log(err);
      }
    })
  })
  
  setTimeout(function () {
    //If the client didn't authenticate, disconnect it
    if (!client.auth) {
      console.log('Disconnecting client ', client.id)
      client.disconnect('unauthorized')
    }
  }, 1000)
  
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

checkAuthToken = ((token, cb) => {
  console.dir(token);
  return cb(null, true);
})

const port = 8084
http.listen(port, function(){
  console.log('listening on *:', port);
});