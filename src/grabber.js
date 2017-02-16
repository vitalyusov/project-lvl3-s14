import cheerio from 'cheerio';
import axios from './lib/axios';
import fs from 'fs';
import { promiseWrite, genName } from './utils';


const download = (item, dir) => {
  const ref = item.attribs.href || item.attribs.src;

  return axios({ responseType: 'arraybuffer' }).get(ref)
    .then((result) => {
      const filename = `${dir}/${genName(ref)}`;
      console.log(filename);
      return promiseWrite(filename, result.data);
    });
};

export default (dir = '.', data) => {
  const $ = cheerio.load(data);
  const links = $('link');
  const scripts = $('script').filter((i, el) => $(el).attr('src'));
  const imgs = $('img');
  const items = [...links, ...scripts, ...imgs];
  fs.mkdirSync(dir);

  return Promise.all(items.map(i => download(i, dir)))
    .then(() => new Promise((resolve, reject) => resolve(data)));
};
