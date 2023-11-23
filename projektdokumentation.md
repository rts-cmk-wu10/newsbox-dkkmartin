# Projektdokumentation

#### Navn: Martin bruun

##### Hold: WU10

##### Uddannelse: Webudvikler

##### Uddannelsessted: Roskilde Tekniske Skole

[Link til (min applikaton)](https://newsbox.martinbruun.dk/)

## Teknologier

- HTML
- CSS
- JavaScript
- Webpack

---

### Redegørelse for oprindelsen af evt. tredjeparts kode anvendt i opgaveløsningen (Teknisk dokumentation)

(Hvilke node-pakker har du installeret for at dit projekt virker? Beskriv kort hvilket "problem" hver pakke løser.)

#### Bootstrap

Hurtigere opsætning af html. Færdige komponenter som overholder [WCAG 2.1](https://www.w3.org/TR/WCAG/) standarder

#### Animejs

Nemmere at lave animationer til diverse ting

#### Toastr

Nem måde at lave flotte notifikationer

#### Auto-animate

Auto animate animere automatisk alle childs af det parent man sætter den på.
Den animere når et child bliver tilføjet, fjernet og rykket.

### Argumentation for de valg du selvstændigt har truffet under løsningen af opgaven

(Hvilke overvejelser har du gjort dig, fx. i forbindelse med dit valg af animationer)

Mine overvejelser var blandt andet:

- Selve siden skulle se ens ud med designet jeg har fået.
- Alle tingene på siden skulle virke og virke godt.
- De hentede artikler skulle ikke kune blive vist for brugeren hvis en artikel allerede er blevet gemt.
- Selve siden skulle være en SPA, så ingen refreshes på siden.
- Bruge vidt så muligt lightweight npm pakker.

---

### Vurdering af egen indsats & gennemførelse af opgaveforløbet (Arbejdsgangen)

(Hvad gik godt. Hvor prioriterede du forkert. Klagesange fra de varme lande om halvfærdigt produkt, på grund af manglende nattesøvn, fordi din kæle-skildpadde havde tandpine er IKKE interessante.)

Jeg synes selv at det hele er gået meget godt. Jeg ville ikke sige at jeg har prioriteret noget forkert da jeg har lavet alt der skulles og mere til.

En ting jeg nok burde have lavet var en swipe function til at refreshe de accordions nu når jeg gik efter at lave det som en SPA

---

### En beskrivelse af særlige punkter til bedømmelse

(er der en særlig detalje som du synes din underviser bør lægge mærke til når dit projekt evalueres)

Prøv at spamme API requests ved at åbne accordions og søge mange gange på kort tid.

Lig mærke til at hver gemt artikel ikke bliver vist igen når man åbner en accordion (Hvis en accordion er blevet åben så skal der refreshes før den ville lave API requests igen)
