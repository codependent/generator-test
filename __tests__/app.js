'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-test:app', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({ projectName: 'proyecto', enabled: false, nombre: 'Jose' });
  });

  it('creates files', () => {
    assert.file(['./proyecto/someFolder/someFile.txt']);
  });
});
