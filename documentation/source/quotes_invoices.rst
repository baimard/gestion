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

La fenêtre d'e-mail permet de renseigner le destinataire, les copies, le sujet
et le message. Le document généré est joint à l'envoi.

L'administrateur Nextcloud doit avoir configuré le serveur de messagerie global.
En cas d'échec, testez d'abord l'envoi d'un e-mail depuis les paramètres
d'administration Nextcloud.

Conservation
------------

Les documents affichés dans Gestion reposent sur les données courantes. Après
émission ou acceptation, enregistrez une version PDF non modifiable dans
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

Le bouton **Finalize and lock** demande une confirmation puis verrouille
irréversiblement le devis ou la facture. Les envois par e-mail et à Iopole
verrouillent également le document avant la tentative d'envoi : un échec de
messagerie laisse le document verrouillé et permet une nouvelle tentative.

Le verrouillage est contrôlé côté serveur, y compris pour les éditions de
lignes et les changements d'ordre. Les produits, le client et les informations
de l'entreprise utilisés par un document verrouillé sont protégés afin qu'un
changement du catalogue ne modifie pas un ancien document. Pour de nouveaux
prix, dupliquez le produit ; pour modifier une offre, dupliquez le devis. Pour
changer l'identité de l'émetteur après verrouillage, créez une nouvelle
configuration d'entreprise. Le statut de paiement d'une facture reste éditable.

Même sans verrouillage, les produits utilisés par un devis, les clients utilisés
par un devis et les devis liés à une facture ne peuvent pas être supprimés.
La suppression d'un devis brouillon supprime ses lignes pour éviter les
références orphelines. Une entreprise contenant un document verrouillé ne peut
pas être supprimée.
