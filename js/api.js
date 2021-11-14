const getData = (onSuccess, onError) => {

  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error();
    })
    .then((advertisements) => {
      onSuccess(advertisements);
    })
    .catch(() => {
      onError();
    });
};

const sendData = (onSuccess, onError, body) => {
  fetch(
    'https://24.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        return onSuccess();
      }

      throw new Error();
    })
    .catch(() => {
      onError();
    });
};

export {getData, sendData};
