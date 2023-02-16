import config from '../config';

export const getApiCall = (url, header) => {
  let finalUrl = `${config.baseURI}/api/${url}`;

  // console.log('getApiCall', finalUrl);
  return fetch(finalUrl, {
    method: 'GET',
    headers: {
      ...header
    },
  }).then((response) => {
    // console.log('response', response.status);
    return response.json();
  });
};

export const genericApiCall = (url, method, data, header) => {
  try {
    let finalUrl = `${config.baseURI}/api/${url}`;
    console.log('generic api call', finalUrl)
    return fetch(finalUrl, {
      method: method,
      headers: {
        Accept: 'application/json',
        ...header,
      },
      body: data,
      //body: JSON.stringify(data),
    }).then((response) => {
      // console.log('apicall response', response.status);
      return response.json();
    });
  } catch (error) {
    console.log('error at catch', error);
  }
};
