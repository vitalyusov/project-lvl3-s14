import fs from 'fs';
import os from 'os';
import path from 'path';
import nock from 'nock';
import loader from '../src';


const host = 'https://hexlet.io';
const pathname = '/courses';

const tmpDirPrefix = `${os.tmpdir()}/hex${path.sep}`;
const sourceContent = fs.readFileSync('__tests__/__fixtures__/hexlet-io-courses.html', 'utf8');
const expectedContent = fs.readFileSync('__tests__/__fixtures__/hexlet-io-courses-expected.html', 'utf8');

beforeEach(() => {
  nock(host)
    .get(pathname)
    .reply(200, sourceContent);
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


it('should download page with all assets', (done) => {
  const tmpPath = fs.mkdtempSync(tmpDirPrefix);
  return loader(`${host}${pathname}`, tmpPath).then(() => {
    expect(fs.existsSync(`${tmpPath}/hexlet-io-courses_files/cdn2-hexlet-io-assets-application-f7ef9ab40200773689e703b1cc34e56ab0ad811a10a652f9b9d4e5dacc71f43a.css`)).toBeTruthy();
    expect(fs.existsSync(`${tmpPath}/hexlet-io-courses_files/cdn2-hexlet-io-assets-icons-default-favicon-196x196-422632c0ef41e9b13dd7ea89f1764e860d225ca3c20502b966a00c0039409a75.png`)).toBeTruthy();
    expect(fs.existsSync(`${tmpPath}/hexlet-io-courses_files/cdn2-hexlet-io-assets-icons-default-favicon-32x32-2bae33d5d827199a252cd9309926586f01044782f3c83e3ffaf783bb318707a2.png`)).toBeTruthy();
    expect(fs.existsSync(`${tmpPath}/hexlet-io-courses_files/cdn2-hexlet-io-attachments-67ea28a8442cde06ca708dbf37d1c646b7712bb4-store-13aa01e2c919362c1add8a658a0bd440c9b2b98a6af036ae5512d9363487-image.png`)).toBeTruthy();
    done();
  }).catch((err) => {
    console.log(err);
    done();
  });
});
