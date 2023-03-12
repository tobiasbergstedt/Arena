const calculateTimeLeft = (dateFuture) => {
  const dateNow = new Date();

  // return daysDifference;
  let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;

  // calculate days
  let days = Math.floor(diffInMilliSeconds / 86400);
  diffInMilliSeconds -= days * 86400;

  // calculate hours
  let hours = Math.floor(diffInMilliSeconds / 3600) % 24;
  diffInMilliSeconds -= hours * 3600;

  // calculate minutes
  let minutes = Math.floor(diffInMilliSeconds / 60) % 60;
  diffInMilliSeconds -= minutes * 60;

  // calculate seconds
  let seconds = Math.floor(diffInMilliSeconds % 60);

  const timeLeft = {
    days,
    hours,
    minutes,
    seconds,
  };

  // Switch to type string and format 00
  const keys = Object.keys(timeLeft);

  keys.forEach((key) => {
    if (timeLeft[key] < 10) {
      timeLeft[key] = String(`0${timeLeft[key]}`);
    } else {
      timeLeft[key] = String(timeLeft[key]);
    }
  });

  return timeLeft;
};

export default calculateTimeLeft;
