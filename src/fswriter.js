import fs from 'fs';

export default (dirname, data, cb) => {
  const filename = `${dirname}/fdfd.html`;
  fs.writeFile(filename, data, cb);
};
