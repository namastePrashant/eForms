import config from '../config';
import http from '../utils/https';
import { getAllChecklistSuccess } from '../store/reducer/checklist';
import { genericApiCall, getApiCall } from '../utils/apiCalls';

export const checkListAPI = {
  fetchById: async (id) => {
    try {
      const url = config.endpoints.checklist.replace(':id', id);
      const response = await http.get(url);

      return response.data.data;
    } catch (err) {
      return err;
    }
  },
};

export const getAllChecklistApi = () => {
  let url = `${config.endpoints.checklists}`;
  return (dispatch) => {
    getApiCall(url)
      .then((responseJson) => {
        if (responseJson.success) {
          dispatch(getAllChecklistSuccess(responseJson.data));
        }
      })
      .catch((error) => console.log('error', error));
  };
};
