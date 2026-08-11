# Conventional Commits

Ce projet suit la convention [Conventional Commits](https://www.conventionalcommits.org/fr/).

## Format

```
<type>(<portee optionnelle>): <description courte>

[corps optionnel]

[footer optionnel]
```

## Types principaux

| Type       | Utilisation                                              |
|------------|-----------------------------------------------------------|
| `feat`     | Ajout d'une nouvelle fonctionnalite                       |
| `fix`      | Correction d'un bug                                       |
| `docs`     | Modification de la documentation uniquement                |
| `style`    | Formatage, indentation (sans changement de logique)        |
| `refactor` | Modification du code sans ajout de fonctionnalite ni fix   |
| `test`     | Ajout ou modification de tests                             |
| `chore`    | Taches diverses (config, dependances, build...)             |

## Exemples pour ce projet

```
feat(etudiants): ajouter la route POST /etudiants
fix(etudiants): corriger le code de statut du DELETE
docs: ajouter le guide d'installation dans le README
chore: installer nodemon et ts-node
refactor(controller): centraliser la gestion des erreurs
feat(db): ajouter la connexion PostgreSQL avec pg
```

## Bonnes pratiques

- Ecrire les messages a l'imperatif ("ajouter", pas "ajoute" ou "ajoutee")
- Une seule intention logique par commit
- Garder la ligne de description sous 72 caracteres
- Utiliser le corps du message pour expliquer le "pourquoi" si necessaire
