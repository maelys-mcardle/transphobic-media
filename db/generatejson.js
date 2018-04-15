const fetch = require('node-fetch');
const zlib = require('zlib');
const datalib = require('datalib');
const fs = require('fs');

const generateJson = async () => {
  const remoteImdbUrl = 'https://datasets.imdbws.com/title.basics.tsv.gz';
  const localImdbPath = 'db/imdb.tsv';
  const transphobiaDb = 'db/transphobic.tsv';

  const rawImdbDb = await getImdbDatabase(remoteImdbUrl, localImdbPath);
  const parsedTransphobiaDb = parseTsvData(transphobiaDb);
  combineImdbTransphobiaData(rawImdbDb, parsedTransphobiaDb);
};

function combineImdbTransphobiaData(rawImdbDb, parsedTransphobiaDb)
{
  // Get header.
  let [line, linePosition] = getNextLine(rawImdbDb, 0);
  console.log(line);

  // Get entries.
  while (linePosition > 0) {
    [line, linePosition] = getNextLine(rawImdbDb, linePosition + 1);
    let [tconst,
      titleType,
      primaryTitle,
      originalTitle,
      isAdult,
      startYear,
      endYear,
      runtimeMinutes,
      genres] = line.split('\t');
    console.log(tconst);
  }  
}

function getNextLine(fileContents, startPosition)
{
  const endPosition = fileContents.indexOf('\n', startPosition);
  const line = fileContents.slice(startPosition, endPosition);
  return [line, endPosition];
}

async function getImdbDatabase(url, localDatabasePath)
{
  if (!fs.existsSync(localDatabasePath)) {
    // No local copy of database. Download it and save it to file.
    const imdbDatabase = await downloadImdbDatabase(url);
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