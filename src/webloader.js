import fs from 'fs';

import path from 'path';
import url from 'url';
import axios from './lib/axios';

const genName = u => u.replace(/[^0-9a-zA-Z-]/g, '-').toLowerCase().concat('.html');

const promiseWrite = (filename, data) => new Promise((resolve, reject) => {
  try {
    fs.writeFileSync(filename, data);
    resolve();
  } catch (err) {
    reject(err);
  }
});

export default (uri, dir = '.') => {
  const parsedUrl = url.parse(uri);
  const base = url.format({ protocol: parsedUrl.protocol, host: parsedUrl.host });
  const filename = genName(`${parsedUrl.hostname}${parsedUrl.pathname}`);

  return axios({ baseURL: base, responseType: 'arraybuffer' })
    .get(parsedUrl.pathname)
    .then(result => promiseWrite(path.resolve(dir, filename), result.data));
};
