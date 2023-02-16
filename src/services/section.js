import config from '../config';
import { nestedFormData } from '../utils/formData';
import { genericApiCall } from '../utils/apiCalls';
import notification from '../reusable/notification';

// export const sectionAPI = {
//   updateSection: async () => {
//     try {
//       const url = `${config.endpoints.section}/answer`;
//       const options={

//       }
//       const response = await http.post(url, {}, options);
//       console.log('response', response);

//       if (response?.data?.success) {
//       }
//     }
//   },
// };

export const updateSectionApi = (data, authHeader, successCallback, finalCallback) => {
  let url = `${config.endpoints.section}/answer`;
  let header = authHeader;
  let formData = nestedFormData(data);
  // formData.forEach((value, key) => {
  //   console.log(key + ' ' + value);
  // });

  genericApiCall(url, 'POST', formData, header)
    .then((responseJson) => {
      console.log('updateSection response', responseJson);
      if (responseJson.success) {
        successCallback()
      }
      notification.info({
        message: responseJson.message,
      });
    })
    .catch((error) => console.log('errr', error))
    .finally(() => finalCallback());
};

// export const updateSectionApi = async (data) => {
//   let options = {
//     headers: {
//       userid: 1,
//       pin: 1234,
//     },
//   };
//   const response = http.post(
//     `${config.endpoints.section}/answer`,
//     data,
//     options
//   );
//   console.log('response', response);
// };
