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
  console.log(`New Client Connected`);
  socket.emit('newMessage',{
    from:'server@gmail.com',
    text:'Hii Dinesh',
    timeStamp:new Date()
  });
  socket.on('createMessage',(message)=>{
    console.log('createMessage',message);
  });
  socket.on('disconnect',()=>{
    console.log('Client Disconnected');
  });
});

app.use(express.static(publicPath));

server.listen(port,()=>{
  console.log(`Server is up on port ${port}`);
});
