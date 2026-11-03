Devis, factures, PDF et e-mails
===============================

Devis
-----

La liste des devis permet de créer, ouvrir, dupliquer ou supprimer un devis.
Les colonnes principales sont la date d'émission, le numéro, le client associé,
la version et le statut.

Dans le détail du devis, utilisez **Ajouter produit** pour créer une ligne.
Sélectionnez ensuite le produit, adaptez la quantité et ajoutez un commentaire
si nécessaire. Les flèches permettent de réordonner les lignes.

.. video:: _static/videos/devis.webm
   :width: 800

Factures
--------

Une facture est associée à un devis. La liste permet de définir le numéro, la
date de prestation, la date d'échéance, le moyen de paiement, le devis associé,
la version et le statut de paiement.

Moyens de paiement structurés :

* espèces ;
* chèque ;
* virement ;
* carte ;
* virement SEPA.

Ces choix sont convertis en codes normalisés dans Factur-X.

.. video:: _static/videos/facture.webm
   :width: 800

Générer un PDF
--------------

Depuis un devis ou une facture :

#. vérifiez le dossier de sauvegarde dans la navigation ;
#. ouvrez le document ;
#. contrôlez les lignes, les totaux, les coordonnées et les mentions ;
#. cliquez sur **Enregistrer dans Nextcloud (PDF)**.

Le PDF est téléchargé par le navigateur et enregistré dans Nextcloud.

.. video:: _static/videos/pdf.webm
   :width: 800

Envoyer par e-mail
------------------

L'action **Send by email** des listes de devis et de factures utilise le compte
personnel par défaut de l'application **Nextcloud Mail**. Mail doit être installé,
activé et connecté à un compte capable d'envoyer des messages. Si ces prérequis
ne sont pas remplis, Gestion affiche une information sans lancer d'envoi.

La confirmation affiche l'expéditeur et le destinataire en lecture seule ;
le destinataire vient de la fiche client. Le sujet et le message restent
modifiables. Le PDF du document est joint à l'envoi. Un avertissement explique
le verrouillage définitif d'une facture et de son devis avant tentative de
livraison ; un envoi de devis seul ne le verrouille pas. Fermer le dialogue
ou utiliser **Cancel** ne lance ni envoi ni verrouillage. Voir
:doc:`document_lifecycle` pour la conduite à tenir en cas d'échec.

L'ancien point d'entrée d'envoi par le serveur SMTP global reste présent pour
les intégrations existantes. Il exige aussi la référence du document à
finaliser ; il ne remplace pas les prérequis Mail de l'action des listes.

Conservation
------------

Les brouillons affichés dans Gestion reposent sur les données courantes.
Finalisez les documents prêts à être émis comme expliqué dans
:doc:`document_lifecycle`. Après émission ou acceptation, enregistrez une version PDF non modifiable dans
Nextcloud Files et appliquez les durées de conservation exigées dans votre
juridiction.

Remises commerciales
----------------------

Dans un devis modifiable, la colonne **Discount (%)** définit une remise par
ligne, comprise entre 0 et 100 %. Elle s'applique avant la TVA. Le montant HT de
chaque ligne est arrondi au centime, puis les bases sont regroupées par taux de
TVA. Les totaux web, PDF, statistiques et Factur-X utilisent la remise. Les
lignes d'en-tête restent descriptives et ne participent pas aux totaux.

Dans le XML Factur-X, le prix net de la ligne intègre la remise et correspond à
son montant HT. Cette version ne propose pas de remise globale sur le document.

Verrouillage des documents
---------------------------

Le bouton **Finalize and lock**, réservé à la facture, demande une confirmation
puis verrouille la facture et son devis. Le devis reste modifiable tant qu'aucune
facture liée n'est finalisée. Le cadenas de la liste des devis permet d'ouvrir
le document et reflète cet état ; un message rouge indique le verrouillage lié
à une facture.

Les envois d'une facture par e-mail ou à Iopole la verrouillent avant la tentative
de livraison. Un échec ne lève pas cette protection. Les envois d'un devis ne le
verrouillent pas. Le téléchargement des PDF reste disponible dans tous les cas.

Le serveur interdit les modifications et suppressions après verrouillage,
y compris le statut de paiement. Les fiches client, produits et informations
de l'entreprise liées sont également protégées. Pour une nouvelle offre,
dupliquez le devis ou le produit ; utilisez une nouvelle configuration pour
changer l'identité de l'émetteur.

Même sans verrouillage, les produits utilisés par un devis, les clients utilisés
par un devis et les devis liés à une facture ne peuvent pas être supprimés.
La suppression d'un devis brouillon supprime ses lignes pour éviter les
références orphelines. Une entreprise contenant un document verrouillé ne peut
pas être supprimée.


Pour le détail des messages, des confirmations avant envoi, des états
brouillon/verrouillé et des solutions après un refus, consultez
:doc:`document_lifecycle`.
