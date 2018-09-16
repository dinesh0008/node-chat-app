var generateMessage = (from,text) => {
  return {
    from,
    text,
    timeStamp:new Date()
  };
};

var generateLocationMessage = (from,latitude,longitude)=>{
  return {
    from,
    url:`https://www.google.com/maps?q=${latitude},${longitude}`,
    timeStamp:new Date()
  }
};

module.exports = {
  generateMessage,
  generateLocationMessage
};
