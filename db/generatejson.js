const fetch = require('node-fetch');
const zlib = require('zlib');
const datalib = require('datalib');

const generateJson = async () => {
  const url = 'https://datasets.imdbws.com/title.basics.tsv.gz';
  const imdbDb = await downloadImdbDatabase(url);
  const parsedImdbDb = parseTsvData(imdbDb);
};

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