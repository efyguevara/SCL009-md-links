#!/usr/bin/env node

const mdLinks = require('./md-links.js')
const process = require('process');
const options = {};

process.argv.forEach((val, index) => {
  
  if (val.includes('-stats' || '--stats')) {
    options['stats'] = true;
  }
  if (val.includes('-validate' || '--validate')) {
    options['validate'] = true;
  }
});
const path = process.argv[2];

mdLinks(path, options)
.then(res => {
  return res
});