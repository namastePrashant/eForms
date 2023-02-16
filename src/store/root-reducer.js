import { combineReducers } from 'redux';
import sidebar from './reducer/sidebar';
import form from './reducer/form';
import checklist from './reducer/checklist';
import users from './reducer/users';
import auth from './reducer/auth';
import machine from './reducer/machine';
import sku from './reducer/sku';
import response from './reducer/response';

const rootReducer = combineReducers({
  auth,
  sidebar,
  form,
  checklist,
  users,
  machine,
  sku,
  response
});

export default rootReducer;
