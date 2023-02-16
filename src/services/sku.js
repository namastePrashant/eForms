import config from '../config';
import { getApiCall } from '../utils/apiCalls';
import { getAllSkuSuccess } from '../store/reducer/sku';

export const getAllSkuApi = (data) => {
  let url = `${config.endpoints.sku}`;
  return (dispatch) => {
    getApiCall(url)
      .then((responseJson) => {
        if (responseJson.success) {
          dispatch(getAllSkuSuccess(responseJson.data));
        }
      })
      .catch((error) => console.log('error', error));
  };
};
