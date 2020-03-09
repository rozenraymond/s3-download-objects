import groupByKeyType from '../../src/utils/groupByKeyType';

describe('groupByKeyType', () => {
  it('should group object key to files and directories', () => {
    const s3Keys = [
      { Key: 'puppies/' },
      { Key: 'puppies/breed/' },
      { Key: 'puppies/breed/shiba-inu.jpg' },
      { Key: 'puppies/breed/french-bulldog.png' },
    ];
    const expected = {
      files: [
        'puppies/breed/shiba-inu.jpg',
        'puppies/breed/french-bulldog.png',
      ],
      directories: ['puppies/', 'puppies/breed/'],
    };

    const groupedKeys = groupByKeyType(s3Keys);

    expect(groupedKeys).toEqual(expected);
  });
});
