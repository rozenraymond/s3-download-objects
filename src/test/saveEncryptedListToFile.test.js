import { readContentFromFile, removeFile } from '../fixtures';
import saveEncryptedListToFile from '../utils/saveEncryptedListToFile';

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

    const buffer = Buffer.from(filenames.join('\n'));

    await saveEncryptedListToFile(buffer);

    const content = await readContentFromFile(pathToFile);

    expect(content).toEqual(buffer.toString());
  });
});
