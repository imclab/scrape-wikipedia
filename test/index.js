
var wikipedia = require('..');
var assert = require('assert');
var fs = require('fs');
var path = require('path');

describe('scrape wikipedia', function(){
  it('should scrape table', function(){
    var page = fs.readFileSync('./examples/List_of_Elements.html', 'utf-8');
    var data = wikipedia(page);
    console.log(data)
  });
});