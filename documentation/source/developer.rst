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
