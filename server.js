const io = require('socket.io')();

const initialCount = 1234;

io.on('connection', (client) => {
  let count = initialCount
  console.log('connection');
  client.on('subscribeToAppointmentService', (interval) => {
    setInterval(() => {
      client.emit('appointmentCount', {
		  'enterprise': 'some_enterprise',
		  'count': count,
	  });
	  count += Math.floor((Math.random() * 5) + 1)
    }, interval);
  });
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);