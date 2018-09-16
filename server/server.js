const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage,generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connect',(socket)=>{
  console.log(`New Client Connected ${socket.id}`);
  socket.emit('newMessage',generateMessage('Dinesh','Welcome to the Crush App'));

  socket.broadcast.emit('newMessage',generateMessage('Dinesh','New User joined'));
  socket.on('createMessage',(message,callback)=>{
    console.log('createMessage',message);
    io.emit('newMessage',generateMessage(message.from,message.text));
    callback();
  });
  socket.on('createLocationMessage',(coords)=>{
    io.emit('newLocationMessage',generateLocationMessage('Location',coords.latitude,coords.longitude));
  });
  socket.on('disconnect',()=>{
    console.log('Client Disconnected');
  });
});

app.use(express.static(publicPath));

server.listen(port,()=>{
  console.log(`Server is up on port ${port}`);
});
