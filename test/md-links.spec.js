const mdLinks = require('../md-links.js');

describe("Alaliza las rutas correspondientes a files", () => {
  
  test('File: Si es un archivo md vacio, debe retornar []', (done) => {
    expect.assertions(1);
    return mdLinks('test/test.md').then(data => {
      expect(data).toEqual([]);
      done()
    });
  });

  test('File: Resuelve un objeto con la información de cada link', (done) => {
    expect.assertions(1);
    return mdLinks('src/prueba2.md').then(data => {
      expect(data).toEqual([{
        href: 'https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback',
        text: 'Leer un directorio',
        file: 'src/prueba2.md'
      },
      {
        href: 'https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback',
        text: 'Leer un directorio',
        file: 'src/prueba2.md'
      },
      {
        href: 'https://github.com/efyg/SCL009-md-links/blob/master/prueba.md',
        text: 'Leer un archivo',
        file: 'src/prueba2.md'
      }]);
      done()
    });
  });

  test('File: Resuelve un objeto con las estadisticas de los links analizados en el archivo: Tota de linksb y links unicos', (done) => {
    expect.assertions(1);
    return mdLinks('./prueba.md', { stats: true }).then(data => {
      expect(data).toEqual({ "Total": 8, "Unique": 6 });
      done()
    });
  });

  test(`File: Este comando entrega un array de objetos que contienen el href, Text, File y Stats de cada link  encontrado`, async (done) => {
    expect.assertions(1);
    const data = (await mdLinks('./src/prueba2.md', { validate: true }))
    expect(data).toEqual([{
      href: 'https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback',
      text: 'Leer un directorio',
      file: './src/prueba2.md',
      stats: { Ok: true, Cod: 200, Status: 'OK' }
    },
    {
      href: 'https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback',
      text: 'Leer un directorio',
      file: './src/prueba2.md',
      stats: { Ok: true, Cod: 200, Status: 'OK' }
    },
    {
      href: 'https://github.com/efyg/SCL009-md-links/blob/master/prueba.md',
      text: 'Leer un archivo',
      file: './src/prueba2.md',
      stats: { Ok: false, Cod: 404, Status: 'Not Found' }
    }]
    );
    done()
  });

  test('File: Resuelve un objeto con las estadisticas de los links analizados en el archivo: Total de links, links unicos y links validos', async (done) => {
    await expect
    return mdLinks('./prueba.md', { validate: true, stats: true }).then(data => {
      expect(data).toEqual({ "Broken": 1, "Total": 8, "Unique": 6 });
      done()
    });
  });
})

describe("Alaliza las rutas correspondientes a directory", () => {
  test('Directory: Si es un directorio vacio, debe retornar []', (done) => {
    expect.assertions(1);
    return mdLinks('./test/vacio').then(data => {
      expect(data).toEqual([]);
      done()
    });
  });

  test(`Directory: Entrega un array de objetos que contienen el href, Text y File  de cada link  encontrado`, async (done) => {
    expect.assertions(1);
    const data = await mdLinks('./src');
    expect(data).toEqual(
      [ { 'src/prueba2.md':
     [ { href:
          'https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback',
         text: 'Leer un directorio',
         file: 'src/prueba2.md' },
       { href:
          'https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback',
         text: 'Leer un directorio',
         file: 'src/prueba2.md' },
       { href:
          'https://github.com/efyg/SCL009-md-links/blob/master/prueba.md',
         text: 'Leer un archivo',
         file: 'src/prueba2.md' } ] } ]);
    done()
  });

  test('Directory: Entrega un array de objetos que contienen el href, Text, File y Stats de cada link  encontrado', async (done) => {
    const data = (await mdLinks('./src', { validate: true }));
    expect(data).toStrictEqual(
      [ { 'src/prueba2.md':
     [ { href:
          'https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback',
         text: 'Leer un directorio',
         file: 'src/prueba2.md',
         stats: { Ok: true, Cod: 200, Status: 'OK' } },
       { href:
          'https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback',
         text: 'Leer un directorio',
         file: 'src/prueba2.md',
         stats: { Ok: true, Cod: 200, Status: 'OK' } },
       { href:
          'https://github.com/efyg/SCL009-md-links/blob/master/prueba.md',
         text: 'Leer un archivo',
         file: 'src/prueba2.md',
         stats: { Ok: false, Cod: 404, Status: 'Not Found' } } ] } ]
    );
    done()
  });

  test(`Directory: Entrega un objeto con la cantidad de links que posee el directorio y cuantos de ellos son unicos`, (done) => {
    expect.assertions(1);
    return mdLinks('./src', { stats: true }).then(data => {
      expect(data).toEqual([ { 'src/prueba2.md': { Total: 3, Unique: 2 } } ]);
      done()
    });
  });

  test(`Directory: Entrega un objeto con la cantidad de links que posee el directorio y cuantos de ellos son unicos y cuantos estan rotos`, (done) => {
    expect.assertions(1);
    return mdLinks('./src', { validate: true, stats: true }).then(data => {
      expect(data).toEqual([ { 'src/prueba2.md': { Total: 3, Unique: 2, Broken: 1 } } ]);
      done()
    });
  });
});

describe("File: Genera un error cuando se ingresa un archivo que no existe o con una ruta diferente a 'md", () => {
  it('Debería retornar "Extensión no válida" para el archivo index.js', async () => {
    await expect(mdLinks('./index.js')).rejects.toMatch("Por favor ingrese una extensión válida");
  });

  it('Debería retornar `ENOENT: no such file or directory, stat "./hola.md"` para el archivo noexiste.md', async () => {
    await expect(mdLinks('./noexiste.md')).rejects.toMatch(`ENOENT: no such file or directory, stat './noexiste.md'`);
  });
});

describe("Directory: Genera un error cuando se ingresa un directorio incorrecto/path incorrecto", () => {
  it('Debería retornar `ENOENT: no such file or directory, stat "./directorioinexistente"`', async () => {
    await expect(mdLinks('./directorioinexistente')).rejects.toMatch(`ENOENT: no such file or directory, stat './directorioinexistente'`);
  });
});