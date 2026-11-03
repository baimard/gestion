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

6. Vérifier puis finaliser
---------------------------

#. Vérifiez le client, les informations de l'émetteur, les prix, les remises,
   la TVA et les dates avant de confirmer.
#. Utilisez **Finalize and lock** pour finaliser manuellement. La confirmation
   décrit le caractère définitif de l'action.
#. Si vous envoyez par e-mail ou à Iopole, l'écran d'envoi rappelle que la
   finalisation intervient avant la tentative de livraison.

.. important::

   Le verrouillage est définitif et s'applique aux données liées. Un échec
   d'envoi laisse le document verrouillé, mais autorise une nouvelle tentative.
   Annuler la confirmation n'envoie rien et ne verrouille rien. Consultez
   :doc:`document_lifecycle` avant de finaliser votre premier document.
   Conservez aussi les PDF/XML émis dans Nextcloud Files.

.. video:: _static/videos/pdf.webm
   :width: 800
