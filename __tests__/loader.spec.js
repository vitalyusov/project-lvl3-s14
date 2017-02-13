import nock from 'nock';
import loader from '../src';

const base = 'https://hexlet.io';
const path = '/courses';

beforeAll(() => {
  nock(base)
    .get(path)
    .reply(200, '<html></html>');
});

const checkResult = (err) => {
  console.log('saved');
  console.log(err);
};

it('should return get site content and save file', () => {
  loader(`${base}${path}`, '/tmp', checkResult);
});
