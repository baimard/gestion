.. _cycle-de-vie-documents:

Verrouillage et cycle de vie des documents
==========================================

.. important::

   Ce guide décrit le cycle de verrouillage révisé de la version 3.4.1.
   Installez cette version pour disposer des nouveaux comportements.

Devis et factures
-----------------

Un **devis reste modifiable** tant qu'aucune facture associée n'est verrouillée.
Créer une facture brouillon, télécharger le PDF ou envoyer le devis par e-mail
ne le verrouille pas. Les anciens indicateurs de verrouillage d'un devis isolé
ne bloquent plus son édition en l'absence de facture finalisée.

Dans la liste des devis, le cadenas ouvert ou fermé indique cet état. Cliquez
sur le cadenas pour ouvrir le devis. Un devis verrouillé affiche un message
rouge expliquant qu'une facture associée a été finalisée. Il ne comporte pas de
commande permettant de se verrouiller ou de se déverrouiller indépendamment.

La **facture** possède la commande **Finalize and lock** (verrouiller la facture).
Cette action fige la facture et son devis. Les deux documents ne peuvent plus
être modifiés ni supprimés, y compris les informations et le statut de paiement.
Le client, les produits et les coordonnées de l'émetteur utilisés sont protégés.

Barre d'actions et téléchargement
---------------------------------

Les commandes PDF, Factur-X, XML, historique et verrouillage sont regroupées
en haut du document, dans une barre qui reste visible pendant le défilement.
Sur petit écran, faites défiler ses boutons horizontalement. La désignation
dispose de davantage d'espace ; les colonnes numériques sont resserrées.

Les PDF restent téléchargeables après verrouillage. Les barres d'actions et
les messages de verrouillage n'apparaissent pas dans les fichiers générés.

Verrouiller une facture
-----------------------

#. Ouvrez la facture et contrôlez ses coordonnées, lignes, remises, montants,
   TVA, dates et informations de paiement.
#. Cliquez sur **Finalize and lock** dans la barre supérieure.
#. Lisez l'avertissement et confirmez, ou annulez sans changer l'état.

.. warning::

   La finalisation d'une facture est définitive. Il n'existe pas de bouton de
   déverrouillage. Le devis associé est également protégé.

Envoyer par e-mail ou à Iopole
--------------------------------

L'envoi d'un **devis** ne le finalise pas. Si une facture associée le verrouille
ultérieurement, les prochains envois ne lèvent pas cette protection.

L'envoi d'une **facture** par e-mail ou à Iopole la finalise avant la tentative
de livraison, après confirmation. Elle et son devis restent verrouillés même
en cas d'échec d'envoi ; vous pouvez réessayer. Annuler le dialogue n'envoie rien
et ne change aucun état. Les messages de résultat indiquent si le document est
réellement verrouillé.

Ce que protège le verrouillage
--------------------------------

.. list-table::
   :header-rows: 1
   :widths: 35 65

   * - Élément
     - Conséquence
   * - Facture finalisée et devis associé
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
     - Est protégé après finalisation, comme les autres informations de paiement.
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

Une restauration JSON conserve les factures verrouillées et la protection de
leurs devis dans les nouvelles entreprises créées. Consultez
:doc:`other_features` pour les éléments inclus et exclus des sauvegardes.

Conservez les PDF et XML émis dans Nextcloud Files, ainsi qu'une sauvegarde
complète de l'instance selon vos obligations. Le verrouillage de Gestion ne
remplace ni une archive légale certifiée ni la protection des fichiers et logos
contre des modifications effectuées directement dans Nextcloud Files.

Verrouiller depuis la liste des factures
----------------------------------------

Dans la liste **Factures**, ouvrez le menu **…** à droite de la ligne puis
choisissez **Verrouiller la facture**. La confirmation précise que la facture
et son devis associé deviennent non modifiables. Fermer ou annuler cette
confirmation ne verrouille rien. Une facture déjà verrouillée ne propose plus
cette action ; les téléchargements PDF restent accessibles.
