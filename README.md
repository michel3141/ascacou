# ascacou

```
yarn
make server
```

ou

```
yarn
make build
```
## Notes

les assets sont à fabriquer

    cd src/assets/img/
    ./MAKEFILE.pl
    make

## But

Ascacou se joue à deux, en disposant chacun son tour les pions noirs et blancs sur le plateau.

Le gagnant est celui qui a reproduit le plus de cartes motif de son jeu.

La partie se termine quand aucun pion ne peut être posé.


## trouble shouting

https://github.com/pnpm/pnpm/issues/6804
avec les libs locales liée par link:// par npmp les peerDependencies se trouvaient présentes deux fois.
Problème résolu en utilisant file: au lieu de link:
À tester avec des lib provenant d'un dépôt git
