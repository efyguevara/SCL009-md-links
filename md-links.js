const marked = require('marked');
const fs = require('fs');
const FileHound = require('filehound');
const fetch = require('node-fetch');


mdLinks = (path, options = {}) => {
    //Determina si es un file o un directory
    return new Promise((resolve, reject) => {
        fs.stat(path, (error, stats) => {
            if (error) {
                return reject(error.message);
            }
            if (stats.isFile()) {
                readLinks(path, options)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(err => {
                        reject(err);
                    });
            }
            if (stats.isDirectory()) {
                resolve(readDirectory(path, options));
            }
        });
    })
}

//lee los archivos y entrega información
const readLinks = (path, options) => {
    let links = [];
    const status = {};
    return new Promise((resolve, reject) => {
        fs.readFile(path, "utf8", async (err, data) => {
            if (!path.includes("md")) {
                reject("Por favor ingrese una extensión válida");
            } else {
                const renderer = new marked.Renderer();
                renderer.link = (href, title, text) => {
                    const arrayBase = {
                        href: href,
                        text: text,
                        file: path
                    };
                    links.push(arrayBase);
                }
                marked(data, { renderer: renderer });
            }
            if (options['stats']) {
                let totalLinks = links.length;
                let uniqueLinks = [];
                links.forEach((el) => {
                    if (!uniqueLinks.includes(el.href)) {
                        uniqueLinks.push(el.href)
                    }
                })
                status['Total'] = totalLinks;
                status['Unique'] = uniqueLinks.length;

                //Muestra la cantidad de links rotos
                if (options['validate']) {
                    await fetchLink(links).then(data => {
                        let brokenLinks = data.filter((ele) => !ele.stats.Ok);
                        status['Broken'] = brokenLinks.length;
                    })
                }
                resolve(status);
            }
            if (options['validate'] && !options['stats']) {//si no se coloca la segunda opcion, se ejecuta dos veces el fetchLink(links), en el validate del -validate -stats y validate solo.
                resolve(fetchLink(links));
            }
            resolve(links);
        })
    })
}

// Lee los links de cada archivo .md y guarda la información en el object fetchArr
const fetchLink = (readLinks) => {
    let fetchArr = readLinks.map(element => {
        return fetch(element.href)
            .then((res) => {
                return {
                    Ok: res.ok,
                    Cod: res.status,
                    Status: res.statusText
                }
            })
            .catch(err => {
                console.log("ERROR", err)
                return err;
            });
    })
    return Promise.all(fetchArr)
        .then(values => {
            readLinks.forEach((element, index) => {
                element['stats'] = values[index]
            });
            return readLinks;
        }).catch(err => {
            console.log("ERROR", err);
            return err;
        });
}

//Lee los directorios, accede a cada archivo .md se encuentre y entrega la informaciòn de los links
const readDirectory = (directorio, options) => {
    //Muestra los archivos que esten dentro del directorio que se pasa en "path"
    return new Promise(async (resolve, reject) => {
        let arrForSaveFiles = [];
        const folder = FileHound.create()
            .discard('node_modules')
            .paths(directorio)
            .ext('md')
            .find()

        await folder
            .then(files => {
                files.forEach(element => {
                    arrForSaveFiles.push(readLinks(element, options));
                });

                return Promise.all(arrForSaveFiles)
                    .then(res => {
                        let arrResponse = [];
                        files.forEach((element, index) => {
                            let readLinksObject = {}
                            readLinksObject[element] = res[index];
                            arrResponse.push(readLinksObject)
                        })
                        resolve(arrResponse);
                    })
                    .catch(error => {
                        return reject(new Error(error.message));
                    });
            })
    })
}

module.exports = mdLinks; 