// const mdLinks = require('mdLinks');
const marked = require("marked");
const fs = require('fs');
const FileHound = require('filehound');
const fetch = require('node-fetch');

mdLinks = (path, options = {}) => {
    //Determina si es un file o un directory
    return new Promise(async (resolve, reject) => {
        fs.stat(path, (error, stats) => {
            if (error) {
                console.log(error);
            }
            if (stats.isFile()) {
                
                readLinks(path)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(err => {
                        reject(err)
                        console.log(err);
                    });
            }
            if (stats.isDirectory()) {
                resolve(readDirectory(path));
            }
        });


        //lee los archivos y entrega información
        const readLinks = (path) => {
            let links = [];
            const stats = {};
            return new Promise(async (resolve, reject) => {

                fs.readFile(path, "utf8", async (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        const renderer = new marked.Renderer();
                        renderer.link = (href, title, text) => {
                            const base = {
                                href: href,
                                text: text,
                                file: path
                            };
                            links.push(base);
                        }
                        marked(data, { renderer: renderer })

                    }

                    //Enrtega estadisticas de los links
                    if (options['stats']) {
                        let totalLinks = links.length;
                        let uniqueLinks = [];
                        links.forEach((el) => {
                            if (!uniqueLinks.includes(el.href)) {
                                uniqueLinks.push(el.href)
                            }

                        })
                        stats['Total'] = totalLinks;
                        stats['Unique'] = uniqueLinks.length;

                        //Muestra la cantidad de links rotos
                        if (options['validate']) {
                            await fetchLink(links).then(data => {
                                let brokenLinks = data.filter((ele) => !ele.status.Ok);
                                stats['Broken'] = brokenLinks.length;

                            })
                        }
                        resolve(stats);
                    }

                    if (options['validate'] && !options['stats']) {
                        resolve(fetchLink(links));
                    }
                    resolve(links);
                })
            })
        }

        const fetchLink = (readLinks) => {
            fetchArr = readLinks.map(element => {
                return fetch(element.href)
                    .then((res) => {
                        return {
                            Ok: res.ok,
                            Cod: res.status,
                            Status: res.statusText
                        }
                    })
                    .catch(err => console.log(err));
            })
            return Promise.all(fetchArr)
                .then(values => {
                    readLinks.forEach((element, index) => {
                        element['status'] = values[index]
                    });
                    return readLinks;
                }).catch(console.log);;
        }

        //Lee los directorios, accede a cada archivo .md se encuentre y entrega la informaciòn de los links
        const readDirectory = (directorio) => {
            //Muestra los archivos que esten dentro del directorio que se pasa en "path"
            const files = FileHound.create()
                .discard('node_modules')
                .paths(directorio)
                .ext('md')
                .find()

            files
                .then(res => {
                    res.forEach(element => {
                        readLinks(element)
                            .then(res => {
                                console.log("Archivo:", element);
                                console.log(res);
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    });
                })
        }
    })
}

module.exports = mdLinks; 