function fixUrl(url) {
  // Use the same port as you do in the server file
  if (import.meta.env.MODE === 'development') {
    console.log('DEV MODE');
    console.log(url);

    return `http://localhost:1337${url}`;
  } else {
    console.log('PRODUCTION MODE');
    return `https://arena-ultimatum-api.onrender.com${url}`;
  }
}

export default fixUrl;
