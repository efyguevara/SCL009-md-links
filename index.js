#!/usr/bin/env node

const mdLinks = require('./md-links.js')
const process = require('process');
const options = {};
const util = require('util');

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
    console.log(util.inspect(res, {showHidden: false, depth: null, colors: true}))//el util.inspect simula el formato que tiene por defecto el console.log de un JSON 
    return res;
  })
  .catch(err => {
    console.log(err);
  });