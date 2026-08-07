Clients, produits et TVA
========================

Clients
-------

La page **Clients** contient les informations utilisées dans les devis,
factures et factures électroniques :

* société, prénom et nom ;
* informations légales ;
* SIREN ou identifiant d'entreprise ;
* numéro de TVA intracommunautaire ;
* téléphone et e-mail ;
* adresse, code postal, ville et code pays.

Utilisez un code pays ISO 3166-1 alpha-2, par exemple ``FR``, ``BE`` ou ``DE``.
Pour modifier une valeur, cliquez dans la cellule, saisissez le nouveau contenu
et validez avec **Entrée**.

.. video:: _static/videos/client.webm
   :width: 800

Produits et services
--------------------

Chaque entrée du catalogue possède une référence, une désignation, un prix
unitaire hors taxes, un taux de TVA, une catégorie de TVA et l'indication
éventuelle qu'il s'agit d'un en-tête.

Un produit marqué comme **En-tête** devient une ligne descriptive dans le
devis. Il ne participe pas au calcul comme une ligne commerciale classique.

.. video:: _static/videos/produit.webm
   :width: 800

Catégories de TVA
-----------------

``S``
   Opération soumise à la TVA, notamment aux taux français usuels.

``E``
   Opération exonérée. Un motif d'exonération doit être associé.

``Z``
   Opération taxable au taux zéro.

``O``
   Opération hors champ de la TVA.

``AE``
   Autoliquidation.

``G``
   Exportation hors Union européenne.

``K``
   Livraison intracommunautaire.

La catégorie doit correspondre à la situation fiscale réelle de l'opération.
Le taux numérique et la catégorie sont tous deux exportés dans Factur-X.

Motif d'exonération pour la catégorie E
----------------------------------------

Lorsque vous sélectionnez ``E``, Gestion ouvre automatiquement la fenêtre du
motif d'exonération. Le bouton d'action de la ligne permet de rouvrir la même
fenêtre.

Pour un produit à 0 % nouvellement créé, le motif proposé par défaut est :

``TVA non applicable, art. 293 B du CGI``
   Code Factur-X ``VATEX-FR-FRANCHISE``.

Ce cas est fréquent pour les micro-entrepreneurs bénéficiant de la franchise en
base. Si une autre exonération s'applique, choisissez l'article correspondant
dans la liste. En cas de doute, consultez votre expert-comptable ou
l'administration fiscale.

.. important::

   Une facture Factur-X ne peut actuellement contenir qu'un seul motif
   d'exonération pour l'ensemble de ses lignes de catégorie ``E``. Harmonisez
   les motifs avant de générer le document.
