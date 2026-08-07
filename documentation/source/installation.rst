Installation et mise à jour
============================

Compatibilité
-------------

La compatibilité exacte est déclarée dans ``appinfo/info.xml``. Pour la version
|release|, Gestion requiert PHP 8 ou plus récent et utilise la base de données
configurée par Nextcloud.

Installation depuis le store
-----------------------------

#. Connectez-vous avec un compte administrateur Nextcloud.
#. Ouvrez **Applications**.
#. Recherchez **Gestion** dans la catégorie organisation ou bureautique.
#. Cliquez sur **Télécharger et activer**.
#. Ouvrez Gestion et configurez votre première entreprise.

.. video:: _static/videos/installation.webm
   :width: 800

Installation manuelle
---------------------

Placez l'application dans le répertoire ``apps/gestion`` de Nextcloud, puis
installez ses dépendances et compilez les ressources :

.. code-block:: console

   cd /var/www/nextcloud/apps/gestion
   composer install --no-dev --prefer-dist --optimize-autoloader
   npm ci
   npm run build
   sudo -u www-data php /var/www/nextcloud/occ app:enable gestion

Adaptez les chemins et l'utilisateur du serveur web à votre installation.

Mise à jour
-----------

#. Sauvegardez Nextcloud, sa base de données et son répertoire de données.
#. Mettez à jour l'application depuis le store ou remplacez son code.
#. Exécutez les commandes de mise à niveau Nextcloud si elles sont demandées.
#. Contrôlez les migrations :

   .. code-block:: console

      sudo -u www-data php occ migrations:status gestion

#. Ouvrez Gestion et vérifiez une entreprise, un devis et une facture.

.. warning::

   Ne modifiez pas directement les tables ``gestion_*``. Les changements de
   schéma sont appliqués par les migrations Nextcloud et sont conçus pour les
   différents moteurs de base de données pris en charge.
