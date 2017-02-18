import fs from 'fs';
import cheerio from 'cheerio';
import axios from './lib/axios';
import { promiseWrite, genName } from './utils';


const download = (el, dir, assetsPath) => {
  const key = el.attr('href') ? 'href' : 'src';
  const ref = el.attr(key);

  return axios({ responseType: 'arraybuffer' }).get(ref)
    .then((result) => {
      const filename = genName(ref);
      const fileFullPath = `${dir}/${assetsPath}/${filename}`;
      console.log(filename);
      el.attr(key, `${assetsPath}/${filename}`);
      return promiseWrite(fileFullPath, result.data);
    });
};


export default (mainPageName, dir = '.', data) => {
  const assetsPath = `${mainPageName}_files`;
  fs.mkdirSync(`${dir}/${assetsPath}`);
  const $ = cheerio.load(data);
  const downloadPromise = (i, el) => download($(el), dir, assetsPath);

  const links = $('link').map(downloadPromise);
  const scripts = $('script').filter((i, el) => $(el).attr('src')).map(downloadPromise);
  const imgs = $('img').map(downloadPromise);
  const items = [...links, ...scripts, ...imgs];


  return Promise.all(items)
    .then(() => new Promise(resolve => resolve($.html())))
    .catch(err => console.log(`Failed to save assets\n${err}`))
    ;
};
