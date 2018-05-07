# Transphobic Media Database

The format of the database is in a 
[tab-delimited file](https://en.wikipedia.org/wiki/Tab-separated_values)
with the raw data stored in `transphobic.tsv`.

## Fields

### `imdb`: The IMDB identifier

The IMDB identifier for the movie or show. If the url for the production is
`www.imdb.com/title/tt0109445/`, then the identifier would be `tt0109445`.

### `normalizesTransphobia`: Does it normalize transphobia?

Whether it normalizes transphobia. This includes media containing transphobic 
jokes and productions that cast cis men to play trans women.

This does not include portraying trans women as sex workers. While cis 
writers disproportionately write trans women as sex workers in their 
screenplays, sex work itself is a legitimate profession. Using it as a metric
would suggest there's something wrong with sex work, stigmatizing people in the
process. Therefore it is not cause to consider whether a title normalizes 
transphobia.

```
0: Does not contribute to the marginalization of trans/non-binary people
1: Contributes to the marginalization of trans/non-binary people
-: Not applicable
?: Unknown
```

**Note**: If `transPlayedByCis` or `transJokes` are `1`, so is this.

### `showsTransphobia`: Is any transphobia shown on screen?

Whether the media contains depictions of transphobia on screen. This includes 
transphobic physical aggression, transphobic jokes, or any other form of 
violence against trans/non-binary or otherwise gender variant individuals.

```
0: No transphobia shown on screen
1: Transphobia shown on screen
-: Not applicable
?: Unknown
```

**Note**: If `transJokes` is `1`, so is this.

### `transJokes`: Are there jokes disparaging trans/non-binary people?

Whether there are one or more jokes that rely on ostracizing/stigmatizing 
trans/non-binary people, relationships with trans people, etc. Jokes that 
punch down, instead of up.

```
0: Does not contain jokes that marginalize trans people
1: Contains jokes that marginalize trans people
-: Not applicable
?: Unknown
```

### `transPlayedByCis`: Is a trans/non-binary character exclusively played by a cis actor?

Whether a trans/non-binary role is played, in its entirety, by a cis actor. 
In cases where there are no roles to be played by actors to begin with, such 
as a documentary or reality show, use `-` for not applicable.

```
0: No trans/non-binary characters are played, in their entirety, by a cis actor
1: A trans/non-binary character is played, in its entirety, by a cis actor
-: Not applicable
?: Unknown
```

### `deadTrans`: Does a trans/non-binary character die of causes other than old age?

Whether a trans/non-binary character dies, for any reason other than old age. 
See the [bury your gays](http://tvtropes.org/pmwiki/pmwiki.php/Main/BuryYourGays) 
trope.

```
0: No trans/non-binary characters die of causes other than old age
1: A trans/non-binary character dies of causes other than old age
-: Not applicable
?: Unknown
```

### `title`: The name of the movie or television show

The name of the movie or show. This is only for reference for those consulting
the `transphobic.tsv` file, it is not used elsewhere.
