
/*!
 * user-agent
 * Copyright(c) 2010-2011 TJ Holowaychuk.
 * Authored by TJ Holowaychuk
 * MIT Licensed
 */

/**
 * Library version.
 */

exports.version = '1.0.4'

/**
 * Parse the given user-agent string into an object of usable data.
 *
 * Example:
 *
 *      var userAgent = require('user-agent')
 *      userAgent.parse('Mozilla/5.0 (Windows; U; Windows NT 5.1; en) AppleWebKit/526.9 (KHTML, like Gecko) Version/4.0dp1 Safari/526.8')
 *      // => { name: 'safari', version: '4.0dp1', os: 'Windows XP', full: '... same string as above ...' }
 *
 * @param  {String} str
 * @return {Object}
 * @api public
 */

exports.parse = function(str) {
  var agent = { full: str, name: name(str) };
  agent.version = version(str, agent.name);
  agent.fullName = agent.name + ' ' + agent.version;
  agent.os = os(str);
  return agent;
};

/**
 * Get the browser version based on the given browser name.
 *
 * @param  {String} str
 * @param  {String} name
 * @return {String}
 * @api private
 */

function version(str, name) {
  if (name === 'safari') name = 'version';
  if (name){
	  return new RegExp(name + '[\\/ ]([\\d\\w\\.-]+)', 'i').exec(str) && RegExp.$1 || '';
  }else{
	  var m=str.match(/version[\/ ]([\d\w\.]+)/i);
	  return m && m.length>1 ? m[1] : '';
  }  
}

/**
 * Supported operating systems.
 */

var operatingSystems = {
    'iPad': /ipad/i
  , 'iPhone': /iphone/i
  , 'Windows Vista': /windows nt 6\.0/i
  , 'Windows 7': /windows nt 6\.\d+/i
  , 'Windows 2003': /windows nt 5\.2+/i
  , 'Windows XP': /windows nt 5\.1+/i
  , 'Windows 2000': /windows nt 5\.0+/i
  , 'OS X $1.$2': /os x (\d+)[._](\d+)/i
  , 'Linux': /linux/i
  , 'Googlebot': /googlebot/i
};

var osNames = Object.keys(operatingSystems);

/**
 * Get operating system from the given user-agent string.
 *
 * @param  {String} str
 * @return {String}
 * @api private
 */

function os(str) {
  var captures;
  for (var i = 0, len = osNames.length; i < len; ++i) {
    if (captures = operatingSystems[osNames[i]].exec(str)) {
      return ~osNames[i].indexOf('$1')
        ? osNames[i].replace(/\$(\d+)/g, function(_, n){
          return captures[n]
        }) : osNames[i];
    }
  }
  return '';
}

/**
 * Supported browser names.
 */

var names = [
   'opera'
 , 'konqueror'
 , 'firefox'
 , 'chrome'
 , 'epiphany'
 , 'safari'
 , 'msie'
 , 'curl'
];

/**
 * Get browser name for the given user-agent string.
 *
 * @param  {String} str
 * @return {String}
 * @api private
 */

function name(str) {
  str = str.toLowerCase();
  for (var i = 0, len = names.length; i < len; ++i) {
    if (str.indexOf(names[i]) !== -1) return names[i];
  }
  return '';
}
