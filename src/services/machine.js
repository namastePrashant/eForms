import config from '../config';
import { getApiCall } from '../utils/apiCalls';
import { getAllMachineSuccess } from '../store/reducer/machine';

export const getAllMachinesApi = (data) => {
  let url = `${config.endpoints.machine}`;
  return (dispatch) => {
    getApiCall(url)
      .then((responseJson) => {
        if (responseJson.success) {
          dispatch(getAllMachineSuccess(responseJson.data));
        }
      })
      .catch((error) => console.log('error', error));
  };
};
