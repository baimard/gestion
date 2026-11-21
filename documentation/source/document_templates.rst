Modèles de devis et de factures
================================

La page **Modèles**, placée dans la navigation entre **Mon entreprise** et
**À propos**, permet au propriétaire de l'entreprise de personnaliser
séparément les devis et les factures. Les utilisateurs avec lesquels
l'entreprise est partagée peuvent consulter le réglage, mais pas le modifier.

Organisation des blocs
-----------------------

Chaque modèle est composé de blocs connus par Gestion. Utilisez les flèches
pour changer leur ordre. Les blocs facultatifs peuvent être masqués. Les blocs
**Émetteur et destinataire**, **Détails du document**, **Produits** et
**Totaux généraux** restent obligatoires afin que le document conserve ses
informations commerciales essentielles.

Les zones de logo sont indépendantes. Vous pouvez masquer le logo d'en-tête,
le logo principal centré entre l'émetteur et le destinataire, ou le logo de
pied de page sans supprimer les images enregistrées dans l'entreprise. Le logo
principal reste ancré dans le bloc d'adresses afin de conserver son centrage.

La prévisualisation schématique montre l'ordre de lecture qui sera utilisé dans
la page du devis ou de la facture et dans le PDF généré. Après avoir enregistré
le modèle, ouvrez un document réel pour contrôler le résultat avec ses données.

CSS personnalisé
----------------

Le champ **CSS personnalisé du document** ajuste uniquement l'apparence des
devis ou des factures de l'entreprise courante. Les sélecteurs autorisés sont
affichés sous le champ. Ils correspondent aux blocs, par exemple
``.block-parties``, ``.block-products`` ou ``.block-grand-totals``. Un
sélecteur peut aussi viser un élément de tableau, un paragraphe ou une image
placé dans le bloc.

Les propriétés visuelles courantes sont disponibles, notamment les couleurs,
bordures, espacements, polices, alignements et dimensions. Exemple :

.. code-block:: css

   .block-products th {
     background-color: #e8f3ff;
     color: #1f4b73;
   }

   .block-grand-totals {
     margin-top: 24px;
   }

Sécurité et limites
-------------------

Le système n'accepte aucun modèle HTML libre. Les noms des blocs sont comparés
à une liste blanche et correspondent à des fragments fournis avec
l'application. Un nom ne peut donc pas désigner un fichier ou du code.

Le CSS est analysé côté serveur à l'enregistrement puis de nouveau avant la
génération du PDF. Gestion refuse notamment :

* les URL et ressources externes ;
* ``@import``, les commentaires, les échappements et les expressions ;
* les sélecteurs qui sortent du document ;
* les propriétés non visuelles ou susceptibles de superposer l'interface ;
* les contenus trop volumineux ou mal formés.

Le CSS accepté est automatiquement limité à ``#PDFcontent``. Il ne peut donc
pas modifier la navigation Nextcloud ni les autres applications. Seul le
propriétaire de l'entreprise peut enregistrer un modèle et la requête reste
protégée par le jeton CSRF de Nextcloud.

Les réglages sont inclus dans la sauvegarde JSON de l'entreprise. Lors d'une
restauration, ils sont à nouveau validés avant leur utilisation.

Le modèle est un réglage global de l'entreprise. Une modification s'applique
donc aussi à l'aperçu et à toute nouvelle génération PDF d'un document déjà
finalisé, sans modifier ses données commerciales. Conservez le PDF émis dans
Nextcloud Files lorsqu'une présentation exacte doit être archivée.
