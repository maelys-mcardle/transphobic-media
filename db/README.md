# Transphobic Media Database

The format of the database is in a 
[tab-delimited file](https://en.wikipedia.org/wiki/Tab-separated_values)
with the raw data stored in `transphobic.tsv`.

## Fields

### `imdb`: The IMDB identifier

The IMDB identifier for the movie or show. If the url for the production is
`www.imdb.com/title/tt0109445/`, then the identifier would be `tt0109445`.

### `normalizesTransphobia`: Does it normalize transphobia?

Whether the work itself is transphobic. That is to say, whether the work
contributes to the marginalization of trans/non-binary people, perpetuates 
tropes/myths/caricatures about trans non-binary people, denigrates cis people 
for dating trans/non-binary people, denies trans/non-binary people jobs by 
giving them to cis actors, uses slurs (eg. shemale, tranny) uncritically, 
misgenders trans/non-binary individuals uncritically, etc.

This does not include portraying trans women as sex workers. While cis 
writers disproportionately write trans women as sex workers in their 
screenplays, sex work itself is a legitimate profession. Given that the
current social climate is actively hostile to the well-being of sex workers,
using it as a metric would suggest that there's something with sex work and
further stigmatize sex workers in the process. Therefore it should not be
used to decide whether a work is transphobic.

```
0: Does not contribute to the marginalization of trans/non-binary people
1: Contributes to the marginalization of trans/non-binary people
-: Not applicable
?: Unknown
```

**Note**: If `transPlayedByCis` or `transJokes` are `1`, so is this.

### `showsTransphobia`: Are any transphobic acts shown on screen?

Whether the media depicts any transphobic acts including in works that
are supportive of trans/non-binary individuals. Transphobic acts is defined
as physical aggression, verbal abuse including transphobic jokes, or any other 
form of violence against trans/non-binary individuals that might create an
unpleasant experience for a trans/non-binary person watching.

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

Whether a trans/non-binary character is played, in its entirety, by a cis actor. 
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
