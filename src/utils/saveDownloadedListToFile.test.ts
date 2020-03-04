import { readContentFromFile, removeFile } from '../fixtures';

import { saveDownloadedListToFile } from './saveDownloadedListToFile';

const pathToFile = `${process.cwd()}/downloaded.txt`;

describe('Downloaded list', () => {
  afterEach(async () => {
    await removeFile(pathToFile);
  });

  it('should create a file with downloaded list', async () => {
    const filenames = [
      'puppies.jpg',
      'breed/shiba-inu.jpg',
      'breed/frenchies.png',
    ];

    await saveDownloadedListToFile(filenames);

    const content = await readContentFromFile(pathToFile);

    expect(content).toEqual(filenames.join('\n'));
  });
});
