Facturation électronique et Factur-X
=====================================

Vue d'ensemble
--------------

Gestion génère des factures Factur-X au profil **EN 16931**. Un fichier
Factur-X contient une représentation PDF lisible et un XML CII structuré
embarqué dans le PDF.

Le XML peut également être exporté séparément. La génération et le
téléchargement restent disponibles sans fournisseur externe.

Préparer les données
--------------------

Avant la génération, vérifiez :

* le nom, l'adresse, le code postal et la ville du vendeur ;
* le numéro de TVA, l'IBAN et les identifiants SIRET/SIREN ;
* le nom, l'adresse, le code pays et les identifiants du client ;
* le numéro et les dates de facture ;
* le moyen de paiement ;
* les désignations, quantités, prix, taux et catégories de TVA ;
* le motif VATEX des lignes exonérées.

Les catégories reconnues sont ``S``, ``E``, ``Z``, ``O``, ``AE``, ``G`` et
``K``. Consultez :doc:`clients_products` pour leur signification.

Générer les fichiers
--------------------

Dans une facture ouverte :

**Générer la facture électronique (PDF+XML)**
   Produit et télécharge le PDF Factur-X, puis l'enregistre dans Nextcloud.

**Générer la partie électronique (XML)**
   Produit uniquement le XML CII EN 16931, utile pour contrôler ou transmettre
   la partie structurée.

En cas d'erreur, relisez le message affiché : Gestion refuse notamment les
codes de TVA inconnus et plusieurs motifs d'exonération ``E`` dans une même
facture.

Configurer Iopole
-----------------

Dans **Mon entreprise** puis **Modifier les informations**, sélectionnez
**Iopole** comme plateforme et renseignez :

* Client ID ;
* Client secret ;
* Customer ID ;
* URL de l'API ;
* URL d'authentification.

Enregistrez la plateforme. Lorsque la configuration est complète, le bouton
**Envoyer à Iopole** apparaît dans la facture.

.. warning::

   Les identifiants Iopole sont enregistrés pour l'entreprise courante.
   Réservez l'accès à la configuration aux utilisateurs autorisés et utilisez
   exclusivement les URL communiquées par le fournisseur.

Limites et responsabilité
-------------------------

La disponibilité d'une plateforme, son statut réglementaire et les exigences
de facturation peuvent évoluer. Vérifiez vos obligations auprès des sources
officielles et de vos conseillers. Un PDF classique reste disponible pour les
entreprises non concernées par le dispositif français.

Sécurité de la plateforme
-------------------------

Seul le propriétaire de l'entreprise peut modifier la configuration Iopole.
Les utilisateurs qui disposent d'un partage peuvent envoyer les factures
avec cette configuration, mais ne reçoivent pas ses identifiants. Le secret
n'est jamais renvoyé dans les réponses de configuration, même au propriétaire.
Un champ secret laissé vide conserve le secret enregistré ; désactiver la
plateforme efface sa configuration.

Les deux URL doivent utiliser un nom d'hôte public en HTTPS sur le port 443,
sans identifiant intégré ni fragment. Les redirections ne sont pas suivies.
Le client HTTP Nextcloud applique la validation TLS et sa politique réseau ;
la protection des destinations locales doit rester activée dans les réglages
système Nextcloud (``allow_local_remote_servers`` désactivé). Une configuration
historique avec une URL HTTP ou locale doit être corrigée avant un nouvel envoi.
