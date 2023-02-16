import config from '../config';
import { generateFormData } from '../utils/formData';
import { genericApiCall, getApiCall } from '../utils/apiCalls';
import notification from '../reusable/notification';
import { getAllResponses, fetchResponseHtml } from '../store/reducer/response';


export const createResponseApi = (data, authHeader, successCallback, finalCallback) => {
  //this is for the overview submission
  let url = `${config.endpoints.response}`;
  let formData = generateFormData(data);
  return dispatch => {

    genericApiCall(url, 'POST', formData, authHeader)
      .then((responseJson) => {
        if (responseJson?.success) {
          successCallback(responseJson);
        }
        // notification.info({
        //   message: responseJson?.message,
        // });
      })
      .catch((error) => {
        notification.error({

          message: error?.message,
        });
        console.log('erro', error);
      })
      .finally(() => finalCallback());
  }
};


export const updateResponseApi = (data, authHeader, successCallback, finalCallback) => {
  //for overview update
  let responseId = localStorage.getItem('responseId');
  let url = `${config.endpoints.response}/${responseId}`;
  let formData = generateFormData(data);
  console.log('update response api called', url)
  return dispatch => {
    genericApiCall(url, 'POST', formData, authHeader)
      .then((responseJson) => {
        console.log('response of update overview', responseJson)
        if (responseJson?.success) {
          successCallback(responseJson);
        }
        notification.info({
          message: responseJson?.message,
        });
      })
      .catch((error) => {
        notification.error({
          message: error?.message,
        });
        console.log('erro', error);
      })
      .finally(() => finalCallback());
  }
}

export const closeResponseApi = (data, authHeader, successCallback, failureCallback, finalCallback) => {
  let url = `${config.endpoints.response}/${localStorage.getItem(
    'responseId'
  )}/close`;
  let formData = generateFormData(data);
  // console.log('close response Api called', formData, url);
  genericApiCall(url, 'POST', formData, authHeader)
    .then((responseJson) => {
      console.log('closing response', responseJson);
      if (responseJson.success) {
        console.log('here', responseJson)
        successCallback(responseJson);
      } else {
        console.log('inside else condition')
        failureCallback()
      }
      notification.info({
        message: responseJson?.message,
      });
    })
    .catch((error) => {
      // notification.error({
      //   message: error?.message,
      // });
      console.log('error here', error)
    })
    .finally(() => finalCallback());
};

export const imageUploadApi = (data, successCallback, finalCallback) => {
  let url = `${config.endpoints.image}`;
  let formData = new FormData();
  formData.append('response_id', data.response_id);
  formData.append('item_id', data.item_id);
  formData.append('image', data.image);
  genericApiCall(url, 'POST', formData)
    .then(responseJson => {
      console.log('image upload response', responseJson)
      if (responseJson.success) {
        successCallback(responseJson?.data)
      }
      notification.info({
        message: responseJson?.message,
      });
    })
    .catch(error => console.log('error', error))
    .finally(() => finalCallback())
}

export const getAllResponsesApi = (page, authHeader, finalCallback) => {
  let url = `${config.endpoints.response}?page=${page}`;
  return (dispatch) => {
    getApiCall(url, authHeader)
      .then(responseJson => {
        if (responseJson.success) {
          dispatch(getAllResponses(responseJson?.data))
        }
      })
      .catch(error => console.log('error', error))
      .finally(() => finalCallback())
  }
}

export const getResponseHtmlApi = (responseId, authHeader, finalCallback) => {
  let url = `${config.endpoints.response}/${responseId}/html`
  return (dispatch) => {
    getApiCall(url, authHeader)
      .then(responseJson => {
        if (responseJson.success) {
          dispatch(fetchResponseHtml(responseJson.data))
        }
      })
      .catch(error => console.log('error', error))
      .finally(() => finalCallback())
  }
}