var socket = io();

function scrollToBottom(){
  var messages = $('#messages');
  var newMessage = messages.children('li:last-child');
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();
  if(clientHeight+ scrollTop+newMessageHeight+lastMessageHeight>=scrollHeight){
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect',function (){
  var params = $.deparam(window.location.search);
  socket.emit('join',params,function(error){
    if(error){
      alert(error);
      window.location.href='/';
    }else{
      console.log('No error');
    }
  });
});

socket.on('updateUserList',function(users){
  var ol = $('<ol></ol>');
  users.forEach(function(user){
    ol.append($('<li></li>').text(user));
  });
  $('#users').html(ol);
});

socket.on('disconnect',function (){
  console.log('Disconnected from server');
});

socket.on('newMessage',function (message){
  var formattedTime = moment(message.timeStamp).format('H:mm');
  var template = $('#message-template').html();
  var html = Mustache.render(template,{
    text:message.text,
    from:message.from,
    timeStamp:formattedTime
  });
  $('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage',function(message){
  var formattedTime = moment(message.timeStamp).format('H:mm');
  var template = $('#location-message-template').html();
  var html = Mustache.render(template,{
    url:message.url,
    from:message.from,
    timeStamp:formattedTime
  });
  $('#messages').append(html);
  scrollToBottom();
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
