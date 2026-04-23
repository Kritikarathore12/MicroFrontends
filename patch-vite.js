const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      if (!file.includes('node_modules')) {
        results = results.concat(walk(file));
      }
    } else {
      if (file.endsWith('remoteEntry.js')) results.push(file);
    }
  });
  return results;
}

const files = walk('.');
files.forEach(file => {
  let code = fs.readFileSync(file, 'utf-8');
  if (code.includes('.forEach')) {
    // Replace e.forEach with (Array.isArray(e)?e:[e]).forEach
    // Because the minified variable could be 'e' or 't' or 'n', we replace word boundaries
    // We specifically look for the css loop which looks like: 'assets',e.forEach(e=>{
    code = code.replace(/([a-zA-Z0-9_]+)\.forEach\(/g, '(Array.isArray($1)?$1:[$1]).forEach(');
    fs.writeFileSync(file, code);
    console.log('Patched ' + file);
  }
});
