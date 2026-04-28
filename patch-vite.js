const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  (Array.isArray(list)?list:[list]).forEach(function(file) {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      if (!file.includes('node_modules')) {
        results = results.concat(walk(file));
      }
    } else {
      if (file.endsWith('.js')) results.push(file);
    }
  });
  return results;
}

const files = walk('.');
(Array.isArray(files)?files:[files]).forEach(file => {
  let code = fs.readFileSync(file, 'utf-8');
  let changed = false;

  if (code.includes('.forEach')) {
    // 1. Fix the e.forEach crash
    code = code.replace(/([a-zA-Z0-9_]+)\.forEach\(/g, '(Array.isArray($1)?$1:[$1]).forEach(');
    changed = true;
  }

  if (code.includes('__v__css__')) {
    // 2. Strip broken CSS placeholders containing spaces
    // Example: a([], !1, "./Signup")
    // We replace the first argument of 'a(' if it's a broken CSS string with an empty array []
    const brokenCssRegex = /a\(`__v__css__[^`]* [^`]*`,/g;
    if (brokenCssRegex.test(code)) {
        code = code.replace(brokenCssRegex, 'a([],');
        changed = true;
    }

    const brokenCssRegexQuotes = /a\("__v__css__[^"]* [^"]*",/g;
    if (brokenCssRegexQuotes.test(code)) {
        code = code.replace(brokenCssRegexQuotes, 'a([],');
        changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(file, code);
    console.log('Patched ' + file);
  }
});
