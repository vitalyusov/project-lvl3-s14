import fs from 'fs';

import path from 'path';
import url from 'url';
import axios from './lib/axios';
import grab from './grabber';

const genName = u => u.replace(/[^0-9a-zA-Z-]/g, '-').toLowerCase().concat('.html');

const promiseWrite = (filename, data) => new Promise((resolve, reject) => {
  try {
    fs.writeFileSync(filename, data);
    resolve(data);
  } catch (err) {
    reject(err);
  }
});

export default (uri, dir = '.') => {
  const parsedUrl = url.parse(uri);
  const base = url.format({ protocol: parsedUrl.protocol, host: parsedUrl.host });
  const filename = genName(`${parsedUrl.hostname}${parsedUrl.pathname}`);
  const outputFile = path.resolve(dir, filename);

  return axios({ baseURL: base, responseType: 'arraybuffer' })
    .get(parsedUrl.pathname)
    .then(result => grab(dir, result.data))
    .then(result => promiseWrite(outputFile, result));

};
