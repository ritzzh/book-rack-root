// helpers/timeHelper.js

exports.getElapsedTime = (pastTime) => {
    const currentTime = new Date();
    const pastDate = new Date(pastTime);
    const elapsedMilliseconds = currentTime - pastDate;
  
    const minutes = Math.floor((elapsedMilliseconds / (1000 * 60)) % 60);
  
    return minutes;
  }
  