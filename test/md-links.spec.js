const mdLinks = require('../md-links.js');

describe("Alaliza las rutas correspondientes a files", () => {
  test('File: Resuelve un objeto con la información de cada link', () => {
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
    });
  });

  test('File: Resuelve un objeto con las estadisticas de los links analizados en el archivo: Tota de linksb y links unicos', () => {
    expect.assertions(1);
    return mdLinks('./prueba.md', { stats: true }).then(data => {
      expect(data).toEqual({ "Total": 8, "Unique": 6 });
    });
  });

  test(`File: Este comando entrega un array de objetos que contienen el href, Text, File y Stats de cada link  encontrado`, async () => {
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
  });

  test('File: Resuelve un objeto con las estadisticas de los links analizados en el archivo: Total de links, links unicos y links validos', async () => {
    await expect
    return mdLinks('./prueba.md', { validate: true, stats: true }).then(data => {
      expect(data).toEqual({ "Broken": 1, "Total": 8, "Unique": 6 });
    });
  });
})

describe("Alaliza las rutas correspondientes a directory", () => {
  test(`Directory: Entrega un array de objetos que contienen el href, Text y File  de cada link  encontrado`, async (done) => {
    expect.assertions(1);
    const data = await mdLinks('./src');
    expect(data).toEqual(
      [{
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


  test('Directory: Entrega un array de objetos que contienen el href, Text, File y Stats de cada link  encontrado', async () => {
    const data = (await mdLinks('./src', { validate: true }));
    expect(data).toStrictEqual(
      [{
        href: 'https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback',
        text: 'Leer un directorio',
        file: 'src/prueba2.md',
        stats: { Ok: true, Cod: 200, Status: 'OK' }
      },
      {
        href: 'https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback',
        text: 'Leer un directorio',
        file: 'src/prueba2.md',
        stats: { Ok: true, Cod: 200, Status: 'OK' }
      },
      {
        href: 'https://github.com/efyg/SCL009-md-links/blob/master/prueba.md',
        text: 'Leer un archivo',
        file: 'src/prueba2.md',
        stats: { Ok: false, Cod: 404, Status: 'Not Found' }
      }]
    );
  });


  test(`Directory: Entrega un objeto con la cantidad de links que posee el directorio y cuantos de ellos son unicos`, () => {
    expect.assertions(1);
    return mdLinks('./src', { stats: true }).then(data => {
      expect(data).toEqual({ Total: 3, Unique: 2 });
    });
  });


  test(`Directory: Entrega un objeto con la cantidad de links que posee el directorio y cuantos de ellos son unicos y cuantos estan rotos`, () => {
    expect.assertions(1);
    return mdLinks('./src', { validate: true, stats: true }).then(data => {
      expect(data).toEqual({ Total: 3, Unique: 2, Broken: 1 });
    });
  });
});


// test(`Catch: Deberia retornar un error si se ingresa un archivo con extensión diferente a .md`, done => {
//   // expect.assertions(1);
//   return mdLinks('./prueba.js').catch(data => {
//     expect(data).toEqual(`ERROR { Error: ENOENT: no such file or directory, stat './prueba.js'
//     errno: -2,
//     code: 'ENOENT',
//     syscall: 'stat',
//     path: './prueba.js' }`);
//     done();
//   });
// });


// test('tests error with promises', () => {
//   expect.assertions(1);
//   return mdLinks('./prueba.js').catch(e =>
//     expect(e).toEqual({
//       error: 'User with 2 not found.',
//     }),
//   );
// });

//que sea una extensión md y que no lea un archivo con extensión md
// si un archivo md no contiene links debe retornar {}

