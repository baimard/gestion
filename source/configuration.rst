.. _configuration-des-entreprises:

Configuration des entreprises
==============================

Gestion permet à un même utilisateur de gérer plusieurs entreprises. Le
sélecteur situé en haut de la navigation définit l'entreprise courante ; les
clients, produits, devis, factures et réglages affichés lui appartiennent.

Créer et sélectionner une entreprise
------------------------------------

Ouvrez **Mon entreprise**, puis utilisez **Créer une nouvelle entreprise**.
Sélectionnez ensuite l'entreprise souhaitée dans la navigation latérale.

Informations générales
-----------------------

Le bouton **Modifier les informations de l'entreprise courante** ouvre la
fenêtre de configuration :

* raison sociale, prénom et nom du contact ;
* adresse, code postal et ville ;
* téléphone et adresse électronique ;
* deux lignes d'informations légales ;
* taux de TVA par défaut ;
* numéro de TVA ;
* IBAN ;
* préfixe des numéros de facture ;
* devise et format d'affichage ;
* mentions affichées au bas des documents.

Identifiants français
---------------------

Pour inclure les identifiants qualifiés dans Factur-X :

* saisissez ``SIRET: 12345678901234`` dans **Informations légales 1** ;
* saisissez ``SIREN: 123456789`` dans **Informations légales 2**.

Les espaces et séparateurs sont tolérés, mais le SIRET doit contenir 14 chiffres
et le SIREN 9 chiffres. Si seul un SIRET valide est fourni, Gestion peut en
déduire le SIREN.

Dossier de sauvegarde
---------------------

Le champ **Dossier de sauvegarde** de la navigation ouvre le sélecteur de
dossiers Nextcloud. Les PDF et fichiers Factur-X sont enregistrés sous ce
dossier, dans un sous-dossier propre au document.

Logos
-----

Activez l'affichage des fichiers cachés dans Nextcloud Files, puis placez les
images PNG dans le dossier ``.gestion`` à la racine de vos fichiers :

* ``<identifiant-entreprise>logo.png`` pour le logo principal ;
* ``<identifiant-entreprise>logo_header.png`` pour l'en-tête ;
* ``<identifiant-entreprise>logo_footer.png`` pour le pied de page.

L'identifiant de l'entreprise apparaît dans le sélecteur de la navigation, par
exemple ``id : 2``.

Partage
-------

Dans **Mon entreprise**, recherchez un utilisateur Nextcloud et cliquez sur
**Ajouter**. L'utilisateur partagé peut alors sélectionner cette entreprise et
accéder à ses données Gestion. Le propriétaire peut retirer cet accès depuis la
même page.

.. warning::

   Le partage donne accès aux données commerciales de l'entreprise. Vérifiez
   les droits et la politique interne avant d'ajouter un utilisateur.

Suppression
-----------

Le bouton **Supprimer l'entreprise** efface l'entreprise et les données Gestion
qui lui sont rattachées. Effectuez une sauvegarde avant cette opération.
