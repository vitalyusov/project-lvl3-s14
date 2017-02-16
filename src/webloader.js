// import fs from 'fs';

import path from 'path';
import axios from './lib/axios';
import grab from './grabber';
import { promiseWrite, genName } from './utils';

export default (uri, dir = '.') => {
  const filename = genName(uri);
  const outputFile = path.resolve(dir, `${filename}.html`);

  return axios({ responseType: 'arraybuffer' }).get(uri)
    .then(result => grab(`${dir}/${filename}_files`, result.data))
    .then(result => promiseWrite(outputFile, result));
};
