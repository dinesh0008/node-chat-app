const moment = require('moment');
var generateMessage = (from,text) => {
  return {
    from,
    text,
    timeStamp:moment().valueOf()
  };
};

var generateLocationMessage = (from,latitude,longitude)=>{
  return {
    from,
    url:`https://www.google.com/maps?q=${latitude},${longitude}`,
    timeStamp:moment().valueOf()
  }
};

module.exports = {
  generateMessage,
  generateLocationMessage
};
