const mdLinks = require('../md-links.js');

test('Resuelve un objeto con las estadisticas de los links analizados en el archivo: Tota de links, links unicos y links validos', async () => {
  await expect
  return mdLinks('./prueba.md', { validate: true, stats: true }).then(data => {
    expect(data).toEqual({ "Broken": 1, "Total": 8, "Unique": 6 });
  });
});

test('Resuelve un objeto con las estadisticas de los links analizados en el archivo: Tota de linksb y links unicos', () => {
  expect.assertions(1);
  return mdLinks('./prueba.md', { stats: true }).then(data => {
    expect(data).toEqual({ "Total": 8, "Unique": 6 });
  });
});


test(`Este comando entrega un array de objetos que contienen el href, Text, File y Stats de cada link  encontrado`, async () => {
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


test(`Entrega un array de objetos que contienen el href, Text y File  de cada link  encontrado`, async () => {
  expect.assertions(1);
  const data = await mdLinks('./src');
  expect(data).toBe('Archivo: src/prueba2.md'
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
    }]
  );
});


test('Entrega un array de objetos que contienen el href, Text, File y Stats de cada link  encontrado', async () => {
  const data = (await mdLinks('./src', { validate: true }));
  expect(data).toBe('Archivo: src/prueba2.md'
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


test(`Entrega un objeto con la camtidad de links que posee el directorio y cuantos de ellos son unicos`, () => {
  expect.assertions(1);
  return mdLinks('./src', { stats: true }).then(data => {
    expect(data).toEqual( { Total: 3, Unique: 2 });
  }); 
});


test(`Entrega un objeto con la camtidad de links que posee el directorio y cuantos de ellos son unicos`, () => {
  expect.assertions(1);
  return mdLinks('./src', { validate: true, stats: true }).then(data => {
    expect(data).toEqual( { Total: 3, Unique: 2, Broken: 1 });
  });
});

