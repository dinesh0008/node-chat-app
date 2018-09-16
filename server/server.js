const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connect',(socket)=>{
  console.log(`New Client Connected ${socket.id}`);
  socket.emit('newMessage',{
    from:'Admin',
    text:'Welcome to the chat app',
    timeStamp:new Date()
  });

  socket.broadcast.emit('newMessage',{
    from:'Admin',
    text:'New user joined',
    timeStamp:new Date()
  });
  socket.on('createMessage',(message)=>{
    console.log('createMessage',message);
    io.emit('newMessage',{
      from:message.from,
      text:message.text,
      timeStamp:new Date()
    });
  });
  socket.on('disconnect',()=>{
    console.log('Client Disconnected');
  });
});

app.use(express.static(publicPath));

server.listen(port,()=>{
  console.log(`Server is up on port ${port}`);
});
