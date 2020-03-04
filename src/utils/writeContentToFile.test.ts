import fs from 'fs';

jest.mock('fs', () => {
  return {
    writeFile: jest.fn().mockImplementation((filepath, opts, callback) => {
      console.log('File', filepath);
      console.log('writeFile option', opts);
      callback();
    }),
  };
});

import { writeContentToFile } from './writeContentToFile';

describe('writeContentToFile', () => {
  it('should call "fs.writeFile"', async () => {
    await writeContentToFile('puppies.txt', 'frenchie');

    expect(fs.writeFile).toHaveBeenCalled();
  });
});
