import cheerio from 'cheerio';
import axios from './lib/axios';

export default (dir = '.', data) => {
  const $ = cheerio.load(data);
  const links = $('link');
  const scripts = $('script').filter((i, el) => $(el).attr('src'));
  const imgs = $('img');
  const items = [...links, ...scripts, ...imgs];
  //console.log(links[2].attribs.href);

  console.log(links[0].attribs.href);
  //console.log(imgs);
  //console.log([...links, ...scripts, ...imgs]);
  return axios({ responseType: 'arraybuffer' }).get(links[0].attribs.href).then((result) => {
    //console.log(result.data.toString('utf8'));
    return new Promise((resolve, reject) => {
      resolve(data);
    })
  });

};
