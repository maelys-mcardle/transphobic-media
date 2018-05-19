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
      transphobic,
      showsTransphobia,
      transJokes,
      transPlayedByCis,
      deadTrans,
      title] = line.split('\t');

    transphobiaDb[imdb] = {
      transphobic: tsvValueToJson(transphobic),
      showsTransphobia: tsvValueToJson(showsTransphobia),
      transJokes: tsvValueToJson(transJokes),
      transPlayedByCis: tsvValueToJson(transPlayedByCis),
      deadTrans: tsvValueToJson(deadTrans),
      title: title,
      type: undefined,
      year: undefined,
      endYear: undefined
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
    case '\N':
      return null;
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
      contentType,
      primaryTitle,
      originalTitle,
      isAdult,
      startYear,
      endYear,
      runtimeMinutes,
      genres] = line.split('\t');

    if (parsedTransphobiaDb.hasOwnProperty(tconst)) {
      parsedTransphobiaDb[tconst].title = getTitle(primaryTitle, originalTitle);
      parsedTransphobiaDb[tconst].type = parseContentType(contentType);
      parsedTransphobiaDb[tconst].year = parseInt(startYear);
      parsedTransphobiaDb[tconst].endYear = parseInt(endYear);
    }
  }

  return parsedTransphobiaDb;
}

function getTitle(primaryTitle, originalTitle)
{
  if (originalTitle != primaryTitle) {
    return `${primaryTitle} (${originalTitle})`;
  } else {
    return primaryTitle;
  }
}

function parseContentType(type)
{
  return type.replace(/([A-Z])/g, " $1").toLowerCase();
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