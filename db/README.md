# Transphobic Media Database

The format of the database is in a tab-delimited `.tsv` file with the raw
data stored in the `transphobic.tsv` file.

## Fields

### imdb

The IMDB identifier for the movie or show.

### normalizesTransphobia

Whether it normalizes transphobia. This includes media containing transphobic 
jokes, productions that cast cis men to play trans women, etc. This is
subjective.

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

## deadTrans

Whether a trans character dies.

```
0: No trans characters die
1: A trans character dies
-: N/A
?: Unknown
```

### showsTransphobia

Whether the media contains depictions of transphobia, even if the
production is affirming of trans rights.

```
0: No transphobic act is depicted in the story
1: A transphobic act is depicted in the story
-: N/A
?: Unknown
```

**Note**: If `normalizesTransphobia` is `1`, so is this.

### title

The name of the movie or show in English. This is only for reference within the
file, it is not used when the information is compiled.
