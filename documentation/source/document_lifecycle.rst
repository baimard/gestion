.. _cycle-de-vie-documents:

Verrouillage et cycle de vie des documents
==========================================

.. important::

   Ce guide décrit Gestion **3.4.0**, préparée dans la PR #637. Tant que cette
   version n'est pas intégrée et installée, les nouveaux boutons et messages
   peuvent ne pas apparaître. Les anciens documents ne sont pas
   verrouillés automatiquement : ils peuvent être finalisés après vérification.

Reconnaître l'état d'un document
---------------------------------

**Draft** — brouillon
   Les informations restent modifiables, sous réserve des références existantes.
   Le bouton **Finalize and lock** permet de finaliser le document après
   vérification. Un brouillon reprend encore les données courantes du client,
   du catalogue et de l'entreprise.

**Locked document** — document verrouillé
   Un message d'information explique que le document ne peut plus être modifié
   ou supprimé. Les commandes d'édition sont retirées ou désactivées. Le serveur
   applique aussi cette protection, indépendamment de l'affichage du navigateur.

Les libellés anglais ci-dessus correspondent aux clés de l'interface ; leur
traduction dépend du catalogue de langue installé dans Nextcloud.

Finaliser manuellement
-----------------------

#. Ouvrez le devis ou la facture.
#. Vérifiez le client, les lignes, quantités, prix, remises, TVA, dates et
   informations de l'émetteur. Contrôlez aussi le PDF ou le XML si nécessaire.
#. Cliquez sur **Finalize and lock**.
#. Lisez l'avertissement : l'action est définitive et les données liées seront
   protégées. Pour une facture, le devis associé sera aussi verrouillé.
#. Confirmez pour appliquer le verrouillage, ou fermez le dialogue pour
   conserver l'état précédent.

.. warning::

   Il n'existe pas de bouton de déverrouillage. Une finalisation confirmée ne
   peut pas être annulée dans Gestion. Fermer ou annuler une confirmation, avant
   de l'avoir validée, ne verrouille pas le document.

Envoyer par e-mail ou à Iopole
-------------------------------

L'envoi par e-mail affiche un avertissement dans son écran de confirmation.
Le bouton d'envoi à Iopole ouvre également une confirmation **Finalize and send
to Iopole?**. Dans les deux cas, le message précise que :

* le document est finalisé **avant** la tentative d'envoi ;
* ses données liées sont protégées et une facture verrouille aussi son devis ;
* un échec d'envoi conserve le verrouillage ;
* il reste possible de réessayer d'envoyer le même document ;
* annuler ou fermer le dialogue avant confirmation n'envoie rien et ne change
  pas l'état du document.

Après une tentative, si la finalisation a abouti, un message rappelle que le
verrouillage est conservé, y compris en cas d'erreur de livraison. Rechargez
la liste pour voir son état actualisé. Si la finalisation elle-même est
refusée, le message ne prétend pas que le document a été verrouillé.

Le téléchargement d'un PDF ou la génération d'un XML, sans envoi ni finalisation
explicite, ne verrouille pas le document à lui seul.

Ce que protège le verrouillage
--------------------------------

.. list-table::
   :header-rows: 1
   :widths: 35 65

   * - Élément
     - Conséquence
   * - Devis et facture finalisés
     - Modification et suppression interdites.
   * - Lignes du devis associé
     - Ajout, suppression, modification et réorganisation interdits.
   * - Client et produits référencés
     - Leurs informations ne peuvent plus être modifiées si elles sont
       utilisées par un document verrouillé.
   * - Informations de l'entreprise émettrice
     - Identité, mentions et réglages participant au contenu des documents
       protégés. La configuration d'entreprise ne peut pas être supprimée.
   * - Statut de paiement d'une facture
     - Reste modifiable pour suivre le règlement.
   * - Dossier de sauvegarde et précision d'affichage
     - Restent configurables. Les valeurs stockées et les totaux fiscaux
       ne sont pas modifiés par la précision d'affichage.

Le verrouillage protège les références utilisées par le document ; il ne crée
pas un catalogue séparé pour chaque facture. Cela explique pourquoi un produit
ou une fiche client peut être protégé alors que vous l'ouvrez depuis une autre
page de Gestion.

Modifier une nouvelle offre sans toucher à l'original
------------------------------------------------------

* **Quantité, remise ou contenu d'une offre** : dupliquez le devis, puis
  modifiez le nouveau brouillon. L'original reste verrouillé.
* **Prix ou description d'un produit** : dupliquez le produit et utilisez la
  copie dans le nouveau devis.
* **Coordonnées du client** : créez une nouvelle fiche client ou dupliquez-la
  lorsque cette action est disponible, puis associez-la au nouveau devis.
* **Identité ou coordonnées de l'émetteur** : créez une nouvelle configuration
  d'entreprise pour les futurs documents.
* **Échec de messagerie ou d'Iopole** : corrigez les paramètres d'envoi et
  réessayez avec le document déjà verrouillé.

Un duplicata ne remplace pas un document émis. Pour corriger une facture déjà
émise, appliquez la procédure comptable et réglementaire adaptée avec votre
conseiller ; ce guide ne présente pas de mécanisme de déverrouillage ou d'avoir
automatique.

Comprendre les messages de refus
----------------------------------

**This document is locked…**
   Le document lui-même est finalisé. Dupliquez le devis pour préparer une
   nouvelle offre.

**The quote belongs to a locked document.**
   Le devis est utilisé par une facture verrouillée. Les lignes et données de
   ce devis sont également protégées.

**This record is used by a locked document…**
   Le client ou le produit est référencé par un document finalisé. Créez une
   nouvelle fiche ou dupliquez le produit pour vos changements futurs.

**Company details are used by a locked document…**
   Les informations de l'émetteur sont protégées. Utilisez une nouvelle
   configuration d'entreprise pour changer cette identité.

**This record is still referenced by another document.**
   Une suppression est refusée parce qu'un produit, client ou devis reste
   utilisé, même sans verrouillage explicite. Vérifiez les références ;
   ne supprimez pas les données nécessaires à la conservation des documents.

Ces refus correspondent généralement à une réponse HTTP ``409``. Une référence
invalide ou une donnée ne faisant pas partie de l'entreprise courante peut être
refusée séparément. Un utilisateur dont le partage a été retiré ne récupère pas
l'accès en restaurant son ancienne session.

Historique et conservation
----------------------------

**Change history** permet de consulter l'auteur, la date et les événements de
verrouillage dans l'entreprise courante. La finalisation d'une facture apparaît
également comme un verrouillage du devis associé.

Une restauration JSON conserve les états verrouillés dans les nouvelles
entreprises créées : elle n'est pas une fonction de déverrouillage. Consultez
:doc:`other_features` pour les éléments inclus et exclus des sauvegardes.

Conservez les PDF et XML émis dans Nextcloud Files, ainsi qu'une sauvegarde
complète de l'instance selon vos obligations. Le verrouillage de Gestion ne
remplace ni une archive légale certifiée ni la protection des fichiers et logos
contre des modifications effectuées directement dans Nextcloud Files.
