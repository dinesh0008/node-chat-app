var generateMessage = (from,text) => {
  return {
    from,
    text,
    timeStamp:new Date()
  };
};

module.exports = {
  generateMessage
};
