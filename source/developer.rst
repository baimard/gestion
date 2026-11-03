Documentation développeur
==========================

Architecture
------------

L'application suit l'architecture Nextcloud :

``appinfo/``
   Métadonnées, routes, navigation et migrations déclarées.

``lib/Controller/``
   Points d'entrée HTTP. Les contrôleurs délèguent la logique aux services.

``lib/Service/``
   Logique métier, stockage Nextcloud, PDF, Factur-X, entreprises et
   fournisseurs de facturation électronique.

``lib/Db/``
   Accès aux données au moyen de ``IDBConnection`` et du QueryBuilder
   Nextcloud/Doctrine DBAL. Le code doit rester compatible MariaDB/MySQL,
   PostgreSQL et SQLite.

``templates/``
   Vues PHP Nextcloud.

``src/js/`` et ``src/css/``
   Sources JavaScript et LESS compilées par Webpack.

``tests/``
   Tests PHPUnit, tests Panther, jeux de données et captures de prévisualisation.

Environnement
-------------

Prérequis recommandés :

* PHP 8 ou une version plus récente acceptée par Nextcloud ;
* Node.js et npm ;
* Composer ;
* une installation Nextcloud compatible avec ``appinfo/info.xml`` ;
* Firefox et GeckoDriver pour Panther.

Installer les dépendances et compiler les ressources :

.. code-block:: console

   composer install
   npm install
   npm run build

Commandes courantes
-------------------

.. code-block:: console

   npm run dev
   npm run watch
   npm run build
   npm run verify:template-scripts
   vendor/bin/phpunit --configuration phpunit.xml --testdox
   php tests/Unit/Panther/IhmTest.php

Tests Panther
-------------

Les tests utilisent les variables suivantes :

``NEXTCLOUD_BASE_URL``
   URL de l'instance, par défaut ``http://dev.cybercorp.fr``.

``NEXTCLOUD_TEST_USER``
   Compte Nextcloud de test, par défaut ``nextcloud``.

``NEXTCLOUD_TEST_PASSWORD``
   Mot de passe du compte de test.

Le scénario ``tests/Unit/Panther/IhmTest.php`` régénère les images dans
``tests/Unit/Panther/screens/``. Utilisez exclusivement une instance et un
compte de test : certains scénarios créent puis suppriment des données.

Base de données
---------------

* Utiliser ``OCP\\IDBConnection`` et ``IQueryBuilder``.
* Employer les noms logiques ``gestion_*`` sans préfixe physique ``oc_``.
* Laisser Nextcloud citer les identifiants, en particulier les noms réservés
  comme ``order``.
* Éviter les fonctions spécifiques à un moteur telles que ``NOW()`` ou
  ``DATE_FORMAT()``.
* Créer ou modifier le schéma exclusivement avec les migrations Nextcloud.

Traductions
-----------

Les libellés PHP passent par ``$l->t('…')`` et les libellés JavaScript par
``t('gestion', '…')``. Les clés JavaScript doivent être littérales pour être
extraites correctement.

Les catalogues ``l10n/`` et les fichiers Transifex sont générés par le flux de
traduction du projet ; ils ne doivent pas être modifiés manuellement dans une
PR fonctionnelle.

Version et publication
----------------------

La source de vérité de la version est ``appinfo/info.xml``. L'interface et la
documentation Sphinx lisent cette valeur automatiquement. Lors d'une
publication, vérifiez également les métadonnées du paquet et le tag Git.

La construction de documentation utilisée en CI est :

.. code-block:: console

   python -m pip install -r documentation/requirements.txt
   python -m sphinx -W --keep-going -b html \
       documentation/source documentation/build/html

Tests du nouvel espace de gestion
----------------------------------

Les tests ``WorkspaceTest``, ``BackupFormatTest``, ``CommercialMathTest`` et
``ContactImportServiceTest`` couvrent la restauration transactionnelle, les
relations interentreprises, la confidentialité des identifiants, les protections
des documents et les calculs de remise. La fixture de validation Factur-X
contient également une ligne avec remise.

Des scénarios Playwright sont disponibles dans ``tests/Browser/``. Ils sont
volontaires et ciblent exclusivement une instance de développement locale à
``http://127.0.0.1:8080`` avec Chromium à ``/usr/bin/chromium``. Le scénario
``documents.cjs`` crée une entreprise d'exemple et verrouille un devis : ne pas
l'exécuter avec un compte ou des données de production. Les captures sont
écrites dans ``/tmp/``. Le scénario ``documents.cjs`` écrit aussi sa référence de
jeu de test dans ``/tmp/gestion-e2e-fixture.json`` ; ``lock-information.cjs`` la
réutilise, crée une facture de test et intercepte tous les points d'envoi pour
vérifier les avertissements sans contacter un destinataire ni Iopole. Le chemin
peut être fourni dans ``NEXTCLOUD_TEST_FIXTURE``. Installer Playwright dans un dossier temporaire puis
exposer ses modules via ``NODE_PATH`` ; définir ``NEXTCLOUD_TEST_USER`` et
``NEXTCLOUD_TEST_PASSWORD`` avant de lancer les scénarios.

.. code-block:: console

   npm install --prefix /tmp/gestion-browser playwright
   NODE_PATH=/tmp/gestion-browser/node_modules node tests/Browser/workspace.cjs
   NODE_PATH=/tmp/gestion-browser/node_modules node tests/Browser/documents.cjs
   NODE_PATH=/tmp/gestion-browser/node_modules node tests/Browser/lock-information.cjs

Le nettoyage supprime uniquement les chemins d'exécution dont l'absence de
référence a été vérifiée : export texte historique, helper de debug PHP,
hover JavaScript remplacé par CSS, fonction d'auto-incrémentation inutilisée,
entrée Webpack PDF redondante, ancien composant Vue non monté et police
Google distante remplacée par les SVG locaux. Les routes publiques et les
migrations historiques sont conservées.


Messages et confirmations de verrouillage
------------------------------------------

``src/js/modules/documentLockMessages.js`` rassemble les explications
traduisibles utilisées par la confirmation manuelle, le bandeau persistant et
les envois. Le bandeau se trouve hors de ``PDFcontent`` afin de ne pas apparaître
dans les documents générés.

Les réponses d'envoi par Mail et Iopole contiennent ``documentLocked`` :
``true`` seulement quand la finalisation a abouti, y compris si la livraison
échoue ensuite. L'interface évite ainsi d'affirmer un verrouillage lorsque
l'accès ou la finalisation a été refusé. L'ancien point d'entrée ``sendPDF``
requiert les paramètres ``table`` et ``documentId`` pour finaliser le document.

Les protections de mutation exposent un message explicatif et une réponse
``409`` pour les conflits liés au verrouillage : édition, suppression, ajout
ou ordre des lignes, motif d'exonération et suppression d'entreprise.
``LockInformationTest`` vérifie ces réponses avec des services de livraison
simulés, sans envoi externe. Les confirmations e-mail/Iopole sont contrôlées
avant toute requête d'envoi dans le navigateur.

La branche autonome ``gh-pages`` conserve les sources dans ``source/`` et le
site généré dans ``docs/``. Sa mise à jour est proposée dans une PR distincte
ciblant cette branche ; ``make site`` reconstruit le site avec les avertissements
Sphinx bloquants. Le workflow ``Documentation`` de master utilise quant à lui
``documentation/source`` et publie un artefact GitHub Pages. Les deux modes de
publication doivent être coordonnés ; fusionner une PR de documentation ne
prouve pas à lui seul qu'un déploiement GitHub Pages a abouti.
