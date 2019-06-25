#!/usr/bin/env node
// module.exports = () => {
// };

//const mdLinks = require("./md-links.js")
const process = require('process');
let arrFiles = []; //terminalValue
const marked = require("marked");
const fs = require('fs');
const FileHound = require('filehound');
const path = require('path')
const fetch = require('node-fetch');

process.argv.forEach((val, index) => {
  arrFiles.push(process.argv[index]);
});
console.log("1", process.argv);
console.log("2", arrFiles[2]);


//Determina si es un file o un directory
fs.stat(arrFiles[2], (error, stats) => {
  if (error) {
    console.log(error);
  }
  if (stats.isFile()) {
    console.log("ES UN FILE");
    links(arrFiles[2]);
  }
  if (stats.isDirectory()) {
    console.log("ES UN DIRECTORIO");
    readDirectoryTerminal(arrFiles[2]);
  }
});


const links = (path) => {
  console.log("READ FILE TERMINAL")
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      throw err;
    }
    let links = [];

    const renderer = new marked.Renderer();
    renderer.link = (href, title, text) => {

      links.push({
        href: href,
        text: text,
        file: path
      })
    }
    marked(data, { renderer: renderer })

    //Para mostrar los links
    console.log("links:", links);
    //Para mostrar los links ok
    fetchLink(links);
  })
}

const fetchLink = (links) => {
  links.forEach(element => {
    fetch(element.href)
      .then(resolve => {
        console.log(resolve.url);
        console.log(resolve.ok);
        console.log(resolve.status);
        console.log(resolve.statusText);
      })
  })
}

const readDirectoryTerminal = (directorio) => {
  //Muestra los archivos que esten dentro del directorio que se pasa en "path"
  const files = FileHound.create()
    .discard('node_modules')
    .paths(directorio)
    .ext('md')
    .find()
  files.then(console.log);
}