Statistiques, sauvegardes et informations
=========================================

Statistiques
------------

La page **Statistiques** présente le chiffre d'affaires mensuel hors taxes,
regroupé par année, ainsi qu'un total annuel. Le calcul utilise les factures,
leurs dates de règlement et les lignes de produits associées.

Cette vue est un outil de suivi. Elle ne constitue pas une déclaration fiscale
ou sociale.

Sauvegarde et restauration
---------------------------

Dans **Mon entreprise**, la carte **Backups and recovery** permet de télécharger
une sauvegarde JSON. Une copie est également enregistrée dans
``.gestion/backup/`` dans vos fichiers Nextcloud. Seules les entreprises dont
vous êtes propriétaire sont exportées, avec leurs clients, produits, devis,
factures et lignes de produits. Les fichiers PDF, logos, partages, identifiants
des plateformes électroniques et anciens journaux ne sont pas inclus.

Pour restaurer, sélectionnez un fichier JSON Gestion (20 Mo maximum), vérifiez
l'aperçu, puis confirmez. La restauration crée de **nouvelles entreprises** dont
vous devenez propriétaire. Elle ne remplace ni ne supprime les données en place.
Tous les identifiants et liens entre les enregistrements sont réattribués dans
une transaction ; en cas d'échec, aucun import partiel n'est conservé. Les états
de verrouillage des factures et la protection de leurs devis sont conservés.
Les plateformes doivent être reconfigurées.

Les anciens fichiers texte séparés par des points-virgules ne peuvent pas être
restaurés automatiquement : ils ne conservent pas de façon fiable les colonnes,
les séparateurs présents dans les champs et les retours à la ligne.

Historique des modifications
-----------------------------

Dans **Mon entreprise** ou dans le détail d'un document, ouvrez **Change
history**. Les événements sont limités à l'entreprise courante, avec l'auteur,
la date UTC et les anciennes et nouvelles valeurs des champs édités. Les
événements de création, suppression, verrouillage, réorganisation et restauration
sont aussi enregistrés. Le bouton de chargement donne accès aux événements plus
anciens, par lots de 200. Le suivi commence à la mise à jour ; il ne reconstitue
pas les modifications antérieures. Les secrets des plateformes ne sont pas
journalisés. Ce journal applicatif n'est pas un archivage légal certifié.

Réglage des décimales
----------------------

Dans **Mon entreprise**, la carte **Number formatting** règle de 0 à 6 décimales
l'affichage des prix unitaires et des quantités. Les valeurs stockées ne sont pas
tronquées : une édition affiche la valeur d'origine. Les totaux monétaires
restent arrondis au centime et les calculs fiscaux ne dépendent pas du réglage
d'affichage.

Notice légale
-------------

La page **Notice légale** rassemble des informations par pays. La section
française fournit des rappels généraux sur la facturation et les obligations
des micro-entrepreneurs. Vérifiez toujours la date de mise à jour et les textes
officiels applicables.

À propos et version
-------------------

Le bouton **À propos** affiche les nouveautés et les liens du projet. La version
installée apparaît aussi au bas de la navigation. Ces deux valeurs proviennent
automatiquement de ``appinfo/info.xml``.
