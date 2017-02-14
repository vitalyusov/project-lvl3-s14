import axios from 'axios';
import http from 'axios/lib/adapters/http';

export default (config) => {
  const ax = axios.create(config);
  ax.defaults.adapter = http;
  return ax;
};
