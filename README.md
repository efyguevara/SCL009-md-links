# mdLinks

![Markdown](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQofCXi_HQnlOjFpIvUhiIsX-nWjiBSs5dkZ0WmuNhg75xUyrNb)

## Introducción

mdLinks es un paquete analizador de url's que puede acceder a diferentes rutas especificadas por el usuario, y puede leer el contenido tanto de archivos como de directorios para entregar la información que contiene cada uno (links). 


### Instalación

Para instalar el módulo mdLinks se debe ejecutar el siguiente comando en la terminal: 
```js
    npm install mdLinks
```

### Uso

#### Comandos

####Leer un directorio
```js
    mdLinks directory
```
##### Retorna: 
![mdLinks ./ (directorio)](img/directory.png)

<br>


```js
    mdLinks directory --validate
```
##### Retorna: 
![mdLinks ./ --validate](img/directoryValidate.png)

<br>

```js
    mdLinks directory --stats
```
##### Retorna: 
![mdLinks ./ --stats](img/directoryStats.png)

<br>


```js
    mdLinks directory --validate --stats
```
##### Retorna: 
![mdLinks ./ --validate --stats](img/directoryStatsValidate.png)

<br>

####Leer un Archivo
```js
    mdLinks file
```
##### Retorna: 
![mdLinks ./ (file)](img/file.png)

<br>

```js
    mdLinks file--validate
```
##### Retorna: 
![mdLinks ./ (file) --validate](img/fileValidate.png)

<br>

```js
    mdLinks file --stats
```
##### Retorna: 
![mdLinks ./ (file) --stats](img/fileStats.png)

<br>

```js
    mdLinks file --validate --stats
```
##### Retorna: 
![mdLinks ./ (file) --validate --stats](img/fileStatsValidate.png)


## Versión
* Versión: 0.1.0


## Dependencias
* node: v8.11.4
* npm: v6.9.0
* node-fetch: "^1.0.0"
* filehound: "^1.17.0",
* marked: "^0.6.2",
