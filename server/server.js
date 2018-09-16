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
  console.log(`New Client Connected ${socket}`);
  socket.on('disconnect',()=>{
    console.log('User Disconnected');
  });
});

app.use(express.static(publicPath));

server.listen(port,()=>{
  console.log(`Server is up on port ${port}`);
});
