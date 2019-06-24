#!/usr/bin / env node

module.exports = () => {

};


const process = require('process');
const marked = require("marked");
const FileHound = require('filehound');
const fs = require('fs');
const path = require('path')

// fs.readFile("./prueba.md", "utf8",(err, data) => {
//   if(err){
//     throw err
//   }
//     console.log(data);
// })

const links = (path) => {
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
    console.log(links);
    
  })
}

console.log("1", links("./prueba.md"));

// console.log("2", links("./prueba2.md"));

console.log("3", process.argv);

process.argv.forEach((val, index) => {
});


const files = FileHound.create()
  .discard('node_modules')
  .paths('/home/laboratoriad160/Escritorio')
  .ext('md')
  .find()
//  .then(files => {
//   files.forEach(files => console.log('leyendo archivos', files));
// })
files.then((loquesea) => console.log(loquesea[6]));


fetch(`${baseUrl}api/user/login`, {
  withCredentials: true,
  headers: myHeaders
})
  .then(function (response) {
    console.log(response.status); // Will show you the status
    if (!response.ok) {
      throw new Error("HTTP status " + response.status);
    }
    return response.json();
  })
  .then();




// const files = FileHound.create()
//   .paths('/home/laboratoriad160/Escritorio/SCL009-md-links/')
//   .ext('json')
//   .find()

// .then(files => {
//   files.forEach(file => console.log('leyendo archivos', file));
// })





//CODIGO DE MARINES

const path = require('path');
const process = require("process");
const marked = require("marked");

const fs = require('fs');

const FileHound = require('filehound');

const files = FileHound.create()
  .paths('\\Users\\Maximiliano\\Desktop\\SCL009-md-links')
  .ext('md')
  .find();

files.then(console.log);

// fs.readFile("./prueba.md", "utf8",(err, data) => {
//   if(err){
//     throw err
//   }

//     console.log(data);

// })


// const links = (path) =>{
//   fs.readFile(path,"utf8", (err,data) =>{
//     if(err){
//       throw err;
//     }
//       let links =[];

//     const renderer = new marked.Renderer();

//     renderer.link = function(href, title, text){

//       links.push({

//         href:href,
//         text:text,
//         file:path

//       })

//     }
//     marked(data, {renderer:renderer})
//       console.log(links);
//   })

// }

// //console.log(links("./prueba.md"));
// console.log(process.argv);
// process.argv.forEach((val, index) => {
//   console.log(`${index}: ${val}`);
// });

// const FizzBuzz = (number) => {

//   if(numbre % 5 === 0 && number % 3 === 0){
// console.log("Fizz");
//   }

//   else if(numbre%3 === 0){
//     console.log("Buzz");
//       }

// }

const grab = (flag) => {

  let index = process.argv.indexOf(flag);
  return (index === -1) ? null : process.argv[index + 1];

}

let greeting = grab(" ");
let user = grab(" ");

if (!user || !greeting) {
  console.log("Marico el que lo lea");
} else {
  console.log(`${user} ${greeting}`);
}