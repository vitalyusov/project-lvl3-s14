import axios from 'axios';
import http from 'axios/lib/adapters/http';
import path from 'path';
import url from 'url';
import write from './fswriter';


const genName = u => u.replace(/[^a-zA-Z-]/g, '-').toLowerCase().concat('.html');

const defaultCB = (err) => {
  if (err) {
    console.log(`Something went wrong\n${err}`);
    return;
  }
  console.log('Successfully downloaded');
};

export default (uri, dir = '.', cb = defaultCB) => {
  const parsedUrl = url.parse(uri);
  const base = url.format({ protocol: parsedUrl.protocol, host: parsedUrl.host });
  const filename = genName(`${parsedUrl.hostname}${parsedUrl.pathname}`);

  const ax = axios.create({ baseURL: base });
  ax.defaults.adapter = http;

  ax.get(parsedUrl.pathname)
  .then((result) => {
    try {
      write(path.resolve(dir, filename), result.data);
      cb();
    } catch (e) {
      cb(e);
    }
  })
  .catch(e => cb(e));
};
