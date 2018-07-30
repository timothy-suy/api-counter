const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

app.get('/', function(req, res){
  res.sendFile(path.resolve(__dirname + '/../public/index.html'));
});

io.origins('*:*')
io.on('connection', (client) => {
  //emit random addition of 1-5 appointments
  let count = 2500
  client.on('subscribeToAppointmentService', () => {
    setInterval(() => {
      client.emit('appointmentCount', {
        'enterprise': 'some_enterprise',
        'count': count,
      })
      count += Math.floor((Math.random() * 5) + 1)
    }, Math.floor((Math.random() * 2000) + 500))
  })
})

const port = 8084
http.listen(port, function(){
  console.log('listening on *:', port);
});