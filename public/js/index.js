var socket = io();
socket.on('connect',function (){
  console.log('Connected to server');
});

socket.on('disconnect',function (){
  console.log('Disconnected from server');
});

socket.on('newMessage',function (message){
  var formattedTime = moment(message.timeStamp).format('H:mm');
  console.log('NewMessage',message);
  var li = $("<li></li>");
  li.text(`${message.from} ${formattedTime}: ${message.text}`);
  $("#messages").append(li);
});

socket.on('newLocationMessage',function(message){
  var formattedTime = moment(message.timeStamp).format('H:mm');
  var li = $("<li></li>");
  var a = $('<a target="_blank">My current location</a>');
  a.attr('href',message.url);
  li.text(`${message.from} ${formattedTime}: `);
  li.append(a);
  $("#messages").append(li);
});


$("#message-form").on('submit',function(e){
  e.preventDefault();
  var messageTextbox = $('[name=message]');
  socket.emit('createMessage',{
    from:'User',
    text:messageTextbox.val()
  },function (){
    messageTextbox.val('');
  });
});

var locationButton = $("#send-location");
locationButton.on('click',function(){
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser');
  }
  locationButton.attr('disabled','disabled').text('sending location...');
  navigator.geolocation.getCurrentPosition(function(postion){
    locationButton.removeAttr('disabled','disabled').text('Send location');
    socket.emit('createLocationMessage',{
      latitude:postion.coords.latitude,
      longitude:postion.coords.longitude
    });
  },function(){
    locationButton.removeAttr('disabled','disabled').text('Send location');
    alert('Unable to fetch location');
  });
});
