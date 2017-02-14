import fs from 'fs';
import path from 'path';
import nock from 'nock';
import loader from '../src';


const host = 'https://hexlet.io';
const pathname = '/courses';
const body = '<html></html>';
const tmpDirPrefix = `/tmp/hex${path.sep}`;

beforeAll(() => {
  nock(host)
    .get(pathname)
    .reply(200, body);
});

it('should get page content and save it to file', () => {
  const tmpPath = fs.mkdtempSync(tmpDirPrefix);
  // TODO: remove temp directories

  loader(`${host}${pathname}`, tmpPath).then(() => {
    const resultContent = fs.readFileSync(path.resolve(tmpPath, 'hexlet-io-courses.html'), 'utf8');
    expect(resultContent).toEqual(body);
  })
  .catch(err => console.log(`Error while saving page\n${err}`));
});
