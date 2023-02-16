export const nestedFormData = (object) => {
  const formData = new FormData();
  Object.keys(object).forEach((key) => {
    if (object[key]) {
      if (typeof object[key] === 'object') {
        object[key].forEach((item, index) => {
          Object.keys(item).forEach((childKey) => {
            let itemValue = item[childKey];
            if (typeof itemValue === 'object') {
              //for additional answer value to be sent in json format

              itemValue = JSON.stringify(item[childKey]);
            }
            formData.append(`${key}[${index}][${childKey}]`, itemValue);

          });
        });
      } else {
        formData.append(key, object[key]);
      }
    }
  });
  return formData;
};

export const generateFormData = (object) => {
  const formData = new FormData();
  Object.keys(object).forEach((key) => {
    if (object[key]) {
      if (typeof object[key] === 'object') {
        object[key].forEach((item, index) => {
          formData.append(`${key}[${index}]`, item);
        });
      } else {
        formData.append(key, object[key]);
      }
    }
  });
  return formData;
};
