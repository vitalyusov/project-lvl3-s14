import fs from 'fs';
import os from 'os';
import path from 'path';
import nock from 'nock';
import loader from '../src';


const host = 'https://hexlet.io';
const pathname = '/courses';

const tmpDirPrefix = `${os.tmpdir()}/hex${path.sep}`;
const expectedContent = fs.readFileSync('__tests__/__fixtures__/hexlet-io-courses.html', 'utf8');

beforeAll(() => {
  nock(host)
    .get(pathname)
    .reply(200, expectedContent);
});

it('should get page content and save it to file', (done) => {
  const tmpPath = fs.mkdtempSync(tmpDirPrefix);
  // TODO: remove temp directories

  loader(`${host}${pathname}`, tmpPath).then(() => {
    const resultContent = fs.readFileSync(path.resolve(tmpPath, 'hexlet-io-courses.html'), 'utf8');
    expect(resultContent).toEqual(expectedContent);
    done();
  })
  .catch((err) => {
    console.log(`Error while saving page\n${err}`);
    done();
  });
});

/*
it('should download page with all assets', (done) => {
  const tmpPath = fs.mkdtempSync(tmpDirPrefix);
  loader(`${host}${pathname}`, tmpPath).then(() => {
  });
});
*/
