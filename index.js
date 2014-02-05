
/**
 * Module dependencies.
 */

var cheerio = require('cheerio');

/**
 * Expose `wikipedia`.
 */

module.exports = wikipedia;

/**
 * Scrape wikipedia page.
 */

function wikipedia(str) {
  return extractTable(cheerio.load(str));
}

/**
 * Extract table head.
 */

function extractTHead($) {
  var headers = [];

  $('table.wikitable th').each(function(){
    headers.push(value($('> a', this).text() || $(this).text()));
  });

  return headers;
}

/**
 * Extract table body.
 */

function extractTable($) {
  var headers = extractTHead($);
  var data = [];

  $('table.wikitable tbody tr').each(function(){
    if (!$(this).is(':visible')) return;

    var item = {};

    $('td', this).each(function(i){
      if (!headers[i]) return;

      // remove junk
      $('sup, span:hidden', this).remove();

      item[headers[i]] = value($(this).text());
    });

    data.push(item);
  });

  return { headers: headers, body: data };
}

function value(text) {
  text = text.trim();
  if ('–' == text) return undefined;
  if (!text) return undefined;
  return text;
}