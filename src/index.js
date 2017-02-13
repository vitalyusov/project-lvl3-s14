import axios from 'axios';
import http from 'axios/lib/adapters/http';
import url from 'url';
import writer from './fswriter';

export default (uri, dir = '.', cb = () => {} ) => {

  const parsedUrl = url.parse(uri);
  const base = url.format({ protocol: parsedUrl.protocol, host: parsedUrl.host });

  const ax = axios.create({ baseURL: base });
  ax.defaults.adapter = http;
  ax.get(parsedUrl.pathname).then(result => writer(dir, result.data, cb));
};
