#!/usr/bin/env node
// module.exports = () => {
// };

//const mdLinks = require("./md-links.js")
const process = require('process');
let arrFiles = []; //terminalValue
const marked = require("marked");
const fs = require('fs');
const FileHound = require('filehound');
const path = require('path');
const fetch = require('node-fetch');



process.argv.forEach((val, index) => {
  arrFiles.push(process.argv[index]);
});

console.log("procces.argv", arrFiles[2]);

//Determina si es un file o un directory
fs.stat(arrFiles[2], (error, stats) => {
  if (error) {
    console.log(error);
  }
  if (stats.isFile()) {
    console.log("ES UN FILE");
    readLinks(arrFiles[2])
      .then(res => {
        console.log("Probando readLinks", res);
      })
      .catch(err => {
        console.log(err);
      });
  }
  if (stats.isDirectory()) {
    console.log("ES UN DIRECTORIO");
    readDirectoryTerminal(arrFiles[2]);
  }
});

const readLinks = (path) => {
  return new Promise((resolve, reject) => {
    let links = [];
    fs.readFile(path, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        const renderer = new marked.Renderer();
        renderer.link = (href, title, text) => {
          links.push({
            href: href,
            text: text,
            file: path
          })
        }
        marked(data, { renderer: renderer })

        fetchLink(links);
      }
      resolve(links);
    })
  })
}

const fetchLink = (readLinks) => {
  return new Promise((resolve, reject) => {
    let objectLink = [];
    
      readLinks.forEach(element => {
        fetch(element.href)
        objectLink.push({
          Url: res.url,
          TrueOrFalse: res.ok,
          Cod: res.status,
          Status: res.statusText
        })
       resolve(objectLink)
    })
    reject(err)
  })
}

fetchLink(readLinks)
  .then(res => {
    console.log("FETCHLINK");
  })
  .catch(err => {
    console.log(err);
  })


const readDirectoryTerminal = (directorio) => {
  //Muestra los archivos que esten dentro del directorio que se pasa en "path"
  const files = FileHound.create()
    .discard('node_modules')
    .paths(directorio)
    .ext('md')
    .find()
  // files.then(console.log)
  files
    .then(res => {
      res.forEach(element => {
        console.log("Archivo:", element);
        links(element);
      });
    })
    .catch(err => {
      console.log(err)
    })

}
