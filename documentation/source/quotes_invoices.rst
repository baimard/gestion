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
