Dépannage
=========

Un champ n'est pas enregistré
------------------------------

Cliquez dans la cellule, modifiez sa valeur puis validez avec **Entrée**.
Rechargez la page pour contrôler l'enregistrement. Vérifiez également que
l'entreprise sélectionnée est la bonne.

Le PDF n'est pas enregistré
----------------------------

* choisissez un dossier accessible dans **Dossier de sauvegarde** ;
* vérifiez votre quota et vos droits Nextcloud Files ;
* contrôlez que le navigateur autorise le téléchargement ;
* consultez le journal Nextcloud si le message persiste.

Les logos n'apparaissent pas
-----------------------------

Vérifiez le dossier caché ``.gestion``, le format PNG et le nom exact comprenant
l'identifiant de l'entreprise. Consultez :ref:`configuration-des-entreprises`
et rechargez le document.

La facture Factur-X est refusée
-------------------------------

Contrôlez en priorité :

* les dates et le numéro de facture ;
* l'adresse et le code pays du client ;
* le SIREN/SIRET et le numéro de TVA ;
* l'IBAN et le moyen de paiement ;
* la catégorie et le taux de TVA de chaque produit ;
* le motif d'exonération des lignes ``E``.

Toutes les lignes ``E`` doivent utiliser le même motif dans une facture.

L'envoi d'e-mail échoue
-----------------------

Le serveur de messagerie se configure dans l'administration générale de
Nextcloud, pas dans Gestion. Demandez à l'administrateur de tester les
paramètres SMTP.

Iopole n'est pas proposé dans la facture
-----------------------------------------

Le bouton apparaît uniquement si les cinq champs de configuration Iopole sont
remplis et enregistrés pour l'entreprise courante.

Mode maintenance Nextcloud
---------------------------

Après une mise à jour interrompue, vérifiez l'état de Nextcloud :

.. code-block:: console

   sudo -u www-data php occ status
   sudo -u www-data php occ maintenance:mode --off

N'utilisez la seconde commande que si aucune opération de maintenance n'est
encore en cours.

Obtenir de l'aide
-----------------

Avant d'ouvrir un ticket, indiquez la version de Gestion et de Nextcloud, la
version de PHP, le moteur de base de données, les étapes de reproduction et les
lignes pertinentes du journal sans secret ni donnée personnelle.

Utilisez ensuite `les issues GitHub
<https://github.com/baimard/gestion/issues>`_.
