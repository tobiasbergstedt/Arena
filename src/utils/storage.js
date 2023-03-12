export const session = {
  read(key) {
    let fromStorage = null;
    try {
      fromStorage =
        sessionStorage.getItem(key) && JSON.parse(sessionStorage.getItem(key));
    } catch (err) {
      console.log(err); // eslint-disable-line
    }

    return fromStorage;
  },

  write(key, data) {
    try {
      sessionStorage.setItem(key, JSON.stringify(data));
    } catch (err) {
      console.log(err); // eslint-disable-line
    }

    return data;
  },

  destroy(key) {
    try {
      sessionStorage.removeItem(key);
    } catch (err) {
      console.log(err); // eslint-disable-line
    }
  },
};

export const local = {
  read(key) {
    let fromStorage = null;
    try {
      fromStorage =
        localStorage.getItem(key) && JSON.parse(localStorage.getItem(key));
    } catch (err) {
      console.log(err); // eslint-disable-line
    }

    return fromStorage;
  },

  write(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (err) {
      console.log(err); // eslint-disable-line
    }

    return data;
  },

  destroy(key) {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.log(err); // eslint-disable-line
    }
  },
};

// export default { session, local };
