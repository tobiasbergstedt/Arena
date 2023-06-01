const convertPosition = (place) => {
  let placeString;
  switch (place) {
    case 1:
      placeString = `${place}st`;
      break;
    case 2:
      placeString = `${place}nd`;
      break;
    case 3:
      placeString = `${place}rd`;
      break;
    default:
      placeString = `${place}th`;
      break;
  }
  return placeString;
};

export default convertPosition;
