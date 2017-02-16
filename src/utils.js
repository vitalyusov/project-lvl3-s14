import fs from 'fs';
import path from 'path';
import url from 'url';

const promiseWrite = (filename, data) => new Promise((resolve, reject) => {
  try {
    fs.writeFileSync(filename, data);
    resolve(data);
  } catch (err) {
    reject(err);
  }
});

const genName = (u) => {
  const parsedUrl = url.parse(u);
  const pth = path.parse(`${parsedUrl.hostname}${parsedUrl.pathname}`);
  return `${pth.dir}/${pth.name}`.replace(/[^0-9a-zA-Z-]/g, '-').toLowerCase().concat(pth.ext);
};

export { promiseWrite, genName };
