import config from '../config';
import notification from '../reusable/notification';
import { loginSuccess, storeAuthCred } from '../store/reducer/auth';
import { genericApiCall } from '../utils/apiCalls';

export const authAPI = (data, successCallback, storeInRedux, disableToast) => {
  let url = config.endpoints.auth;
  console.log('auth api', url, data)
  return (dispatch) => {
    genericApiCall(url, 'POST', null, data)
      .then((response) => {
        console.log('response', response);
        if (response?.success) {
          if (storeInRedux) {
            localStorage.setItem('auth', JSON.stringify(data));
            localStorage.setItem('isAuthenticated', true);
            localStorage.setItem('userData', JSON.stringify(response?.data));
            localStorage.setItem('userId', response?.data?.id);
            localStorage.setItem('pin', data?.pin);
            dispatch(loginSuccess(response?.data));
            dispatch(storeAuthCred(data));
          }
          if (!disableToast) {
            notification.info({
              message: `${storeInRedux ? 'Account Unlocked.' : 'AccessGranted'}`,
            });
          }
          successCallback(response);
          // return response.data;
        } else {
          notification.warning({
            message: response?.message,
          });
        }
      })
      .catch((error) => {
        // console.log('errorrrr', error);
        notification.error({
          message: error?.message,
        });
      });
  };
};
