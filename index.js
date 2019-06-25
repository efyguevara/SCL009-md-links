#!/usr/bin / env node

module.exports = () => {

};


const process = require('process');
const marked = require("marked");
const FileHound = require('filehound');
const fs = require('fs');
const path = require('path')
const fetch = require('node-fetch');

process.argv.forEach((val, index) => {
});

const links = (path) => {
  console.log("hola")
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      throw err;
    }
    let links = [];

    const renderer = new marked.Renderer();

    renderer.link = function (href, title, text) {

      links.push({

        href: href,
        text: text,
        file: path
      })
    }
    marked(data, { renderer: renderer })
    // console.log(links);
    
  })
}
console.log("2", links("./prueba2.md"));






const files = FileHound.create()
  .discard('node_modules')
  .paths('/home/laboratoriad160/Escritorio')
  .ext('md')
  .find()
//  .then(files => {
//   files.forEach(files => console.log('leyendo archivos', files));
// })
files.then((loquesea) => console.log(loquesea));



// let baseUrl = "https://docs.npmjs.com/cli/link";
// fetch(`${baseUrl}api/user/login`, {
//   withCredentials: true,
//   headers: myHeaders
// })
//   .then(function (response) {
//     console.log(response.status); // Will show you the status
//     if (!response.ok) {
//       throw new Error("HTTP status " + response.status);
//     }
//     return response.json();
//   })
//   .catch(err)