Gestion pour Nextcloud
======================

**Gestion** est une application de gestion commerciale et de facturation pour
Nextcloud. Elle s'adresse principalement aux indépendants, micro-entreprises et
petites structures qui souhaitent conserver leurs clients, produits, devis,
factures et documents dans leur propre instance Nextcloud.

La documentation correspond à la version |release|.

.. important::

   Les ajustements du cycle de verrouillage décrits ici sont en préparation.
   Ils deviennent disponibles après intégration et installation de la version
   corrigée ; les anciennes installations peuvent présenter d'autres commandes.

Fonctionnalités principales
---------------------------

* gestion de plusieurs entreprises et partage d'une entreprise avec d'autres
  utilisateurs Nextcloud ;
* fiches clients avec adresse, SIREN et numéro de TVA intracommunautaire ;
* catalogue de produits ou services avec taux et catégorie de TVA ;
* création, duplication et suivi des devis et factures ;
* génération et enregistrement de PDF dans Nextcloud Files ;
* envoi des documents par e-mail via le compte personnel Nextcloud Mail ;
* génération de factures électroniques Factur-X au profil EN 16931 ;
* export du XML Factur-X et envoi optionnel vers Iopole ;
* statistiques mensuelles de chiffre d'affaires hors taxes ;
* sauvegarde et restauration JSON des entreprises détenues par l'utilisateur ;
* verrouillage définitif des documents et protection des données liées ;
* remises commerciales par ligne et réglage de la précision d'affichage ;
* historique des modifications et import depuis les contacts Nextcloud.

.. note::

   Gestion aide à produire des documents commerciaux, mais ne remplace pas les
   conseils d'un expert-comptable ou d'un juriste. Les obligations fiscales et
   les mentions légales dépendent de votre activité et de votre pays.

.. toctree::
   :maxdepth: 2
   :caption: Guide utilisateur

   installation
   quickstart
   configuration
   clients_products
   quotes_invoices
   document_lifecycle
   electronic_invoicing
   other_features
   troubleshooting

.. toctree::
   :maxdepth: 2
   :caption: Développement

   developer

Liens utiles
------------

* `Application dans le store Nextcloud
  <https://apps.nextcloud.com/apps/gestion>`_
* `Dépôt GitHub <https://github.com/baimard/gestion>`_
* `Signaler un problème <https://github.com/baimard/gestion/issues>`_
* `Discussions de la communauté
  <https://github.com/baimard/gestion/discussions>`_
