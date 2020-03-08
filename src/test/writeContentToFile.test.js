import fs from 'fs';

import writeContentToFile from '../utils/writeContentToFile';

jest.mock('fs', () => {
  return {
    writeFile: jest.fn().mockImplementation((filepath, opts, callback) => {
      console.log('File', filepath);
      console.log('writeFile option', opts);
      callback();
    }),
  };
});

describe('writeContentToFile', () => {
  it('should call "fs.writeFile"', async () => {
    await writeContentToFile('puppies.txt', 'frenchie');

    expect(fs.writeFile).toHaveBeenCalled();
  });
});
