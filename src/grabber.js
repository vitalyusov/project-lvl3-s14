import cheerio from 'cheerio';

export default (dir = '.', data) => {
  const $ = cheerio.load(data);
  console.log($('link, src'));
  return new Promise((resolve, reject) => {
    resolve(data);
  });
};
