'use strict';

var fs = require('fs');
var assert = require('chai').assert;
var Vinyl = require('vinyl');
var gulp = require('gulp');
var modernizr = require('../');

describe('gulp-modernizr', function() {
  describe('in buffer mode', function() {
    it('should generate a custom Modernizr file', function(done) {

      var TEST_PATH = __dirname + '/vanilla.js';

      var stream = gulp.src(TEST_PATH).pipe(modernizr(
          'modernizr.js', {
              'tests': ['history'],
              'excludeTests': ['dart'],
              'options': ['setClasses', 'html5printshiv']
          }
      ));

      stream.on('data', function(file) {
        assert.notEqual(-1, String(file.path).indexOf('modernizr.js'));
        assert.notEqual(-1, String(file.contents.toString()).indexOf('Modernizr'));
        assert.equal(-1, String(file.contents.toString()).indexOf('dart'));
        assert.notEqual(-1, String(file.contents.toString()).indexOf('html5printshiv'));
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
