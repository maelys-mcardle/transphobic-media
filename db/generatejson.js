const fetch = require('node-fetch');
const zlib = require('zlib');
const datalib = require('datalib');
const fs = require('fs');

const generateJson = async () => {
  const url = 'https://datasets.imdbws.com/title.basics.tsv.gz';
  const filePath = 'imdb.tsv';

  const imdbDb = await getImdbDatabase(url, filePath);
  const parsedImdbDb = parseTsvData(imdbDb);
};

async function getImdbDatabase(url, localDatabasePath)
{
  if (!fs.existsSync(localDatabasePath)) {
    // No local copy of database. Download it and save it to file.
    const imdbDatabase = downloadImdbDatabase(url);
    fs.writeFileSync(localDatabasePath, imdbDatabase);
    return imdbDatabase;
  } else {
    // Local copy of database. Use it.
    const imdbDatabase = fs.readFileSync(localDatabasePath).toString();
    return imdbDatabase;
  }
}

async function downloadImdbDatabase(url)
{
  const response = await fetch(url);
  const gzipedDatabase = await response.buffer();
  const rawDatabase = zlib.gunzipSync(gzipedDatabase);
  return rawDatabase;
}

function parseTsvData(tsvData)
{
  const parsedData = datalib.read(tsvData, {type: 'tsv', parse: 'auto'});
  return parsedData;
}

generateJson();