Statistiques, sauvegardes et informations
=========================================

Statistiques
------------

La page **Statistiques** présente le chiffre d'affaires mensuel hors taxes,
regroupé par année, ainsi qu'un total annuel. Le calcul utilise les factures,
leurs dates de règlement et les lignes de produits associées.

Cette vue est un outil de suivi. Elle ne constitue pas une déclaration fiscale
ou sociale.

Sauvegarde administrative
--------------------------

Dans les paramètres d'administration Nextcloud, la section Gestion propose
**Sauvegarder maintenant**. Le fichier est créé dans :

``.gestion/backup/backup-<date>.txt``

Activez l'affichage des fichiers cachés dans Nextcloud Files pour voir le
dossier ``.gestion``.

.. warning::

   La restauration depuis ce fichier est annoncée comme une fonctionnalité
   future dans l'interface. Conservez également une sauvegarde complète de la
   base Nextcloud et du répertoire de données.

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
