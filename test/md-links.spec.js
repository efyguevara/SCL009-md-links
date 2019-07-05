const mdLinks = require('../md-links.js');

describe("Alaliza las rutas correspondientes a files", () => {
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


  test('Directory: Entrega un array de objetos que contienen el href, Text, File y Stats de cada link  encontrado', async (done) => {
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
    done()
  });


  test(`Directory: Entrega un objeto con la cantidad de links que posee el directorio y cuantos de ellos son unicos`, (done) => {
    expect.assertions(1);
    return mdLinks('./src', { stats: true }).then(data => {
      expect(data).toEqual({ Total: 3, Unique: 2 });
    done()
    });
  });


  test(`Directory: Entrega un objeto con la cantidad de links que posee el directorio y cuantos de ellos son unicos y cuantos estan rotos`, (done) => {
    expect.assertions(1);
    return mdLinks('./src', { validate: true, stats: true }).then(data => {
      expect(data).toEqual({ Total: 3, Unique: 2, Broken: 1 });
      done()
    });
  });
});

it('Debería retornar error ENOENT, si se intenta leer un archivo que no existe (prueba2.md)', async (done)  => {
  await expect(mdLinks('./prueba4.md')).rejects.toMatch(`Por favor ingrese una extensión válida
  { Error: ENOENT: no such file or directory, stat './srss' errno: -2, code: 'ENOENT', syscall: 'stat', path: './srss' }
  `);
  done();
});

it('Debería retornar "Extensión no válida" para el archivo text.txt', async(done)  => {
  await expect(mdLinks('./index.js')).rejects.toMatch(`{ Error: ENOENT: no such file or directory, stat './prueba4.md'
  errno: -2,
  code: 'ENOENT',
  syscall: 'stat',
  path: './prueba4.md' }
(node:30430) UnhandledPromiseRejectionWarning: Error: ENOENT: no such file or directory, stat './prueba4.md'
(node:30430) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). (rejection id: 1)
(node:30430) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
(node:30430) UnhandledPromiseRejectionWarning: TypeError: Cannot read property 'isFile' of undefined
    at fs.stat (/home/laboratoriad160/Escritorio/SCL009-md-links/md-links.js:19:23)
    at <anonymous>
(node:30430) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). (rejection id: 2)
`);
  done(); 
});

// test('Debería retornar "Extensión no válida" para el archivo text.txt', async () => {
//   expect.assertions(1);
//   try {
//     await fetchData();
//   } catch (e) {
//     expect(e).toMatch('error');
//   }
// });


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

