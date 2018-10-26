'use strict';

var fs = require('fs');
var assert = require('assert');
var Vinyl = require('vinyl');
var modernizr = require('../');

describe('gulp-modernizr', function() {
  describe('in buffer mode', function() {
    it('should generate a custom Modernizr file', function(done) {

      var stream = modernizr();

      var TEST_PATH = __dirname + '/vanilla.js';

      stream.on('data', function(file) {
        assert.notEqual(-1, String(file.path).indexOf('modernizr.js'));
        assert.notEqual(-1, String(file.contents).indexOf('Modernizr'));

        done();
      });

      stream.write(new Vinyl({
        path: TEST_PATH,
        contents: fs.readFileSync(TEST_PATH),
      }));

      stream.end();
    });
  });
});
