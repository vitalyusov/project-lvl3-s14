import fs from 'fs';

export default (filename, data) => {
  fs.writeFileSync(filename, data);
};
