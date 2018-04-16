const fetch = require('node-fetch');
const zlib = require('zlib');
const fs = require('fs');

const generateJson = async () => {
  const remoteImdbUrl = 'https://datasets.imdbws.com/title.basics.tsv.gz';
  const localImdbPath = 'db/imdb.tsv';
  const transphobiaDbPath = 'db/transphobic.tsv';
  const transphobiaDbJsonPath = 'src/transphobic.json';

  const rawImdbDb = await getImdbDatabase(remoteImdbUrl, localImdbPath);
  let transphobiaDb = parseTransphobiaDb(transphobiaDbPath);
  transphobiaDb = combineImdbTransphobiaData(rawImdbDb, transphobiaDb);
  writeTransphobiaDbJson(transphobiaDb, transphobiaDbJsonPath);
};

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

function parseTransphobiaDb(dbPath)
{
  const rawTransphobiaDb = fs.readFileSync(dbPath).toString();
  let transphobiaDb = {};

  // Get header.
  let [line, linePosition] = getNextLine(rawTransphobiaDb, 0);

  // Get entries.
  while (linePosition > 0) {
    [line, linePosition] = getNextLine(rawTransphobiaDb, linePosition + 1);
    let [imdb,
      transphobia,
      normalizesTransphobia,
      transJokes,
      transPlayedByCis,
      deadTrans,
      title] = line.split('\t');

    transphobiaDb[imdb] = {
      transphobia: tsvValueToJson(transphobia),
      normalizesTransphobia: tsvValueToJson(normalizesTransphobia),
      transJokes: tsvValueToJson(transJokes),
      transPlayedByCis: tsvValueToJson(transPlayedByCis),
      deadTrans: tsvValueToJson(deadTrans),
      title: title,
      year: undefined
    };
  }

  return transphobiaDb;
}

function tsvValueToJson(value)
{
  switch(value) {
    case '0':
      return false;
    case '1':
      return true;
    case '-':
      return null;
    case '?':
      return undefined;
    default:
      return undefined;
  }
}

function combineImdbTransphobiaData(rawImdbDb, parsedTransphobiaDb)
{
  // Get header.
  let [line, linePosition] = getNextLine(rawImdbDb, 0);

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

    if (parsedTransphobiaDb.hasOwnProperty(tconst)) {
      parsedTransphobiaDb[tconst].title = primaryTitle;
      parsedTransphobiaDb[tconst].year = parseInt(startYear);
    }
  }

  return parsedTransphobiaDb;
}

function getNextLine(fileContents, startPosition)
{
  const endPosition = fileContents.indexOf('\n', startPosition);
  const line = fileContents.slice(startPosition, endPosition);
  return [line, endPosition];
}

function writeTransphobiaDbJson(transphobiaDb, outputPath)
{
  const transphobiaDbAsJson = JSON.stringify(transphobiaDb);
  fs.writeFileSync(outputPath, transphobiaDbAsJson);
}

generateJson();