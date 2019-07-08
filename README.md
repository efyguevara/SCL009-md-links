# SG-MD-LINKS

![Markdown](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQofCXi_HQnlOjFpIvUhiIsX-nWjiBSs5dkZ0WmuNhg75xUyrNb)

## Introducción


sg-md-links es un paquete analizador de url's que puede acceder a diferentes rutas especificadas por el usuario, y puede leer el contenido tanto de archivos como de directorios para entregar información de cada uno de los links encontrados. 


### Instalación  

Para instalar el módulo sg-md-links se debe ejecutar el siguiente comando en la terminal: 
```js
    npm install sg-md-links
```

### Diagrama de flujo:
![Diagrama de flujo](https://github.com/efyguevara/SCL009-md-links/raw/dv/img/flujo.jpeg)


### Guía de uso:
```js
    const md-links = require('sg-md-links'); 
```  

#### Comandos

#### Leer un Archivo
```js
    md-links [file]
```
##### Retorna: 
![md-links ./ (file)](https://github.com/efyguevara/SCL009-md-links/raw/dv/img/file.png)

<hr>

```js
    md-links [file] --validate
```
##### Retorna: 
![md-links ./ (file) --validate](https://github.com/efyguevara/SCL009-md-links/raw/dv/img/fileValidate.png)

<hr>

```js
    md-links [file] --stats
```
##### Retorna: 
![md-links ./ (file) --stats](https://github.com/efyguevara/SCL009-md-links/raw/dv/img/fileStats.png)

<hr>

```js
    md-links [file] --validate --stats
```

##### Retorna: 
![md-links ./ (file) --validate --stats](https://github.com/efyguevara/SCL009-md-links/raw/dv/img/fileValidateStats.png)

<hr>

#### Leer un directorio
```js
    md-links [directory]
```
##### Retorna: 
![md-links ./ (directorio)](https://github.com/efyguevara/SCL009-md-links/raw/dv/img/directory.png)

<hr>

```js
    md-links [directory] --validate
```
##### Retorna: 
![md-links ./ --validate](https://github.com/efyguevara/SCL009-md-links/raw/dv/img/directoryValidate.png)

<hr>

```js
    md-links [directory] --stats
```
##### Retorna: 
![md-links ./ --stats](https://github.com/efyguevara/SCL009-md-links/raw/dv/img/directoryStats.png)

<hr>

```js
    md-links [directory] --validate --stats
```
##### Retorna: 
![md-links ./ --validate --stats](https://github.com/efyguevara/SCL009-md-links/raw/dv/img/directoryValidateStats.png)

<br>

### Versión
* Versión: 1.0.1


### Dependencias
* eslint: "^6.0.1",
* eslint-plugin-jest: "^22.7.1",
* filehound: "^1.17.0",
* jest: "^24.8.0",
* marked: "^0.6.2",
* node-fetch: "^1.0.0"


Para un uso óptimo se recomienda utilizar las siguientes versiones:
* node: v8.11.4
* npm: v6.9.0
<hr>

### Desarrollado por:

Stefany E. Guevara B.