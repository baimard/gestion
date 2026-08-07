Démarrage rapide
================

Ce parcours permet de produire un premier devis, puis une facture.

1. Configurer l'entreprise
--------------------------

#. Ouvrez **Gestion** depuis le menu Nextcloud.
#. Cliquez sur **Mon entreprise**, puis sur **Modifier les informations de
   l'entreprise courante**.
#. Renseignez au minimum le nom, l'adresse, le code postal, la ville, les
   mentions légales, la devise et le taux de TVA par défaut.
#. Pour Factur-X, renseignez également le numéro de TVA, l'IBAN et les
   identifiants SIRET/SIREN comme expliqué dans :doc:`configuration`.
#. Choisissez le **dossier de sauvegarde** dans la navigation latérale.

Les champs éditables sont enregistrés avec la touche **Entrée** ou lors du
changement de sélection, selon le type de champ.

.. video:: _static/videos/demarrage.webm
   :width: 800

2. Créer un client
------------------

#. Ouvrez **Clients**.
#. Cliquez sur **Ajouter client**.
#. Complétez la société ou le nom de la personne, l'adresse et les informations
   fiscales utiles.

.. video:: _static/videos/client.webm
   :width: 800

3. Créer un produit ou un service
---------------------------------

#. Ouvrez **Produits**.
#. Cliquez sur **Ajouter produit**.
#. Saisissez une référence, une désignation, le prix unitaire hors taxes et le
   taux de TVA.
#. Vérifiez la catégorie de TVA. Pour la catégorie ``E``, vérifiez également le
   motif d'exonération proposé.

.. video:: _static/videos/produit.webm
   :width: 800

4. Créer le devis
-----------------

#. Ouvrez **Devis**, puis cliquez sur **Ajouter devis**.
#. Choisissez la date, le numéro, le client, la version et le statut.
#. Ouvrez le devis avec l'action correspondante.
#. Ajoutez les produits, adaptez les quantités et les commentaires.
#. Enregistrez ou téléchargez le PDF.

.. video:: _static/videos/devis.webm
   :width: 800

5. Créer la facture
-------------------

#. Ouvrez **Factures**, puis cliquez sur **Ajouter facture**.
#. Choisissez le devis associé, la date d'échéance et le moyen de paiement.
#. Ouvrez la facture et contrôlez son contenu.
#. Générez le PDF classique ou, pour une facture électronique, le PDF
   Factur-X et/ou son XML.

.. video:: _static/videos/facture.webm
   :width: 800

.. important::

   Une facture dépend d'un devis et reprend ses lignes. Conservez les versions
   émises dans Nextcloud Files : une modification ultérieure du client, du devis
   ou du catalogue peut modifier l'affichage d'un document ouvert dans Gestion.

.. video:: _static/videos/pdf.webm
   :width: 800
