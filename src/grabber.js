import cheerio from 'cheerio';

export default (dir = '.', data) => {
  const $ = cheerio.load(data);
  const links = $('link');
  const scripts = $('script').filter((i, el) => $(el).attr('src'));
  const imgs = $('img');
  const items = [...links, ...scripts, ...imgs];
  //console.log(links[2].attribs.href);
  console.log(scripts[0].attribs.src);
  //console.log(imgs);
  //console.log([...links, ...scripts, ...imgs]);
  return new Promise((resolve, reject) => {
    resolve(data);
  });
};
