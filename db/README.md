# Transphobic Media Database

The format of the database is in a tab-delimited `.tsv` file with the raw
data stored in the `transphobic.tsv` file.

## Fields

### imdb

The IMDB identifier for the movie or show. If the url for the production is
`www.imdb.com/title/tt0109445/`, then the identifier would be `tt0109445`.

### transphobia

Whether the media is transphobic or contains depictions of transphobia 
even if the production itself is affirming of trans rights.

```
0: No transphobia in the content
1: Transphobic or depicts transphobia
-: N/A
?: Unknown
```

**Note**: If `normalizesTransphobia` is `1`, so is this.

### normalizesTransphobia

Whether it normalizes transphobia. This includes media containing transphobic 
jokes and productions that cast cis men to play trans women.

This does not include portraying trans women as sex workers. While trans
women characters are disproportionately sex workers in works of fiction,
sex work is as a legitimate field of work as any. Therefore, including it here
would be stigmatizing of trans people who do sex work, and so, it is not
cause to consider whether a title normalizes transphobia.

```
0: Does not contribute to the marginalization of trans people
1: Contributes to the marginalization of trans people
-: N/A
?: Unknown
```

**Note**: If `transPlayedByCis` is `1`, so is this.

### transPlayedByCis

Whether a trans role is played, in its entirety, by a cis actor.

```
0: No trans characters are played, in their entirety, by a cis actor
1: A trans character is played, in its entirety, by a cis actor
-: N/A
?: Unknown
```

### deadTrans

Whether a trans character dies, for any reason other than old age. See the
[bury your gays](http://tvtropes.org/pmwiki/pmwiki.php/Main/BuryYourGays) 
trope.

```
0: No trans characters die
1: A trans character dies
-: N/A
?: Unknown
```

### title

The name of the movie or show. This is only for reference for those consulting
the `transphobic.tsv` file, it is not used elsewhere.
