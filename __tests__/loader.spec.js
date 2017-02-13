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

it('should get page content and save it to file', (done) => {
  const tmpPath = fs.mkdtempSync(tmpDirPrefix);

  const checkResult = () => {
    const resultContent = fs.readFileSync(path.resolve(tmpPath, 'hexlet-io-courses.html'), 'utf8');
    expect(resultContent).toEqual(body);
    // TODO: remove temp directories
    done();
  };

  loader(`${host}${pathname}`, tmpPath, checkResult);
});
