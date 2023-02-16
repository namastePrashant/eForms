import axios from 'axios';

import config from '../config';

const http = axios.create({
  baseURL: `${config.baseURI}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 90000,
});

export default http;
