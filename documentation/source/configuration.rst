.. _configuration-des-entreprises:

Configuration des entreprises
==============================

Gestion permet à un même utilisateur de gérer plusieurs entreprises. Le
sélecteur situé en haut de la navigation définit l'entreprise courante ; les
clients, produits, devis, factures et réglages affichés lui appartiennent.
La section **Gestion** regroupe les clients, devis, factures et produits.
La section **Information** donne accès aux statistiques et aux mentions
légales.

Sur mobile, le bouton de navigation ouvre le menu latéral. Choisissez ensuite
la rubrique souhaitée. La croix, une pression sur la zone assombrie ou la
touche Échap referment le menu. Le contenu du menu peut défiler pour atteindre
les réglages situés en bas. Ce comportement est corrigé à partir de la version
3.4.3 pour que le menu reste visible avec les styles mobiles de Nextcloud.

Créer et sélectionner une entreprise
------------------------------------

Ouvrez **Mon entreprise**, puis utilisez **Créer une nouvelle entreprise**.
Sélectionnez ensuite l'entreprise souhaitée dans la navigation latérale.

Informations générales
-----------------------

Le bouton **Modifier les informations de l'entreprise courante** ouvre la
fenêtre de configuration :

* raison sociale, prénom et nom du contact ;
* adresse, code postal et ville ;
* téléphone et adresse électronique ;
* deux lignes d'informations légales ;
* taux de TVA par défaut ;
* numéro de TVA ;
* IBAN ;
* préfixe des numéros de facture ;
* devise et format d'affichage ;
* mentions affichées au bas des documents.

Identifiants français
---------------------

Pour inclure les identifiants qualifiés dans Factur-X :

* saisissez ``SIRET: 12345678901234`` dans **Informations légales 1** ;
* saisissez ``SIREN: 123456789`` dans **Informations légales 2**.

Les espaces et séparateurs sont tolérés, mais le SIRET doit contenir 14 chiffres
et le SIREN 9 chiffres. Si seul un SIRET valide est fourni, Gestion peut en
déduire le SIREN.

Dossier de sauvegarde
---------------------

Le champ **Dossier de sauvegarde** de la navigation ouvre le sélecteur de
dossiers Nextcloud. Les PDF et fichiers Factur-X sont enregistrés sous ce
dossier, dans un sous-dossier propre au document.

Logos
-----

Dans **Mon entreprise → Modifier les informations → Logos**, choisissez le logo
principal, d'en-tête ou de pied de page. Le propriétaire peut y importer un
PNG ou un JPEG de 5 Mio maximum et de 20 mégapixels au plus. Gestion prépare un
PNG de 1 200 pixels de côté au maximum et de 256 Kio au plus, en conservant
les proportions et la transparence. Pour les nouveaux imports, le côté le
plus long doit mesurer au moins 64 pixels et le plus court au moins 16 pixels,
y compris après redimensionnement.

Les logos sont enregistrés dans le dossier caché ``.gestion`` de Nextcloud
Files. Les fichiers déposés manuellement restent utilisables dans la limite de
5 Mio et de 20 mégapixels. Gestion prépare leur version optimisée à l'affichage
et conserve le fichier original. Les anciens petits logos restent affichés.
Les noms reconnus pour une entreprise d'identifiant ``2`` sont par exemple
``2logo.png``, ``2logo_header.png`` et ``2logo_footer.png``.

Dans **Mon entreprise → Modifier les informations → Logos**, réglez la largeur
souhaitée pour chacun des trois logos, entre 40 et 600 pixels, et sa hauteur
maximale entre 0 et 600 pixels. **0** conserve une hauteur automatique. Si une
hauteur maximale est définie, le logo est ajusté aux deux limites sans être
déformé ; sa largeur affichée peut donc être réduite. Le logo
principal est limité à 300 pixels de large et 240 pixels de haut pour tenir
entre les deux blocs d'adresse du PDF.

Le logo principal est centré entre l'émetteur et le destinataire, sur le
document et dans le PDF. Sur un écran étroit, le logo s'affiche entre les deux
blocs d'adresse empilés. Les logos se réduisent à la place disponible.
Les logos d'en-tête et de pied de page sont facultatifs. Lorsqu'ils sont
absents, l'espace reste libre
pour les coordonnées et les autres sections. Les réglages s'appliquent
aux devis, factures et PDF.

Profils d'émetteur
------------------

Dans **Mon entreprise**, ouvrez **Profils d'émetteur** pour créer, par exemple,
un profil **Expert de justice** et un profil **Cybercorp**. Le propriétaire de
l'entreprise renseigne un nom de profil, puis les coordonnées de
correspondance et le logo souhaités. Les mêmes formats, limites et règles de
redimensionnement automatique s'appliquent. Les champs laissés vides reprennent
les valeurs de l'entreprise. Un logo de profil remplace les logos habituels
du document. La ligne de chaque profil indique s'il possède un logo
personnalisé, utilise ceux de l'entreprise ou s'affiche sans logo. Ouvrez le
profil pour voir l'aperçu du logo enregistré. Pour le retirer, cochez **Remove profile logo**
(retirer le logo du profil), puis cliquez sur **Enregistrer**. Le profil est
conservé et ses documents modifiables reprennent les logos de l'entreprise.
Pour masquer ces derniers, cochez aussi **Hide company logos when this profile
has no logo**, puis enregistrez.

Dans la barre d'actions d'un devis, choisissez le profil puis cliquez sur
**Appliquer**. Les factures liées reprennent le profil et l'indiquent dans
leur barre d'actions. Les coordonnées de correspondance apparaissent sur
l'aperçu et dans le PDF. Le nom légal, les identifiants de l'entreprise et les
données légales du XML Factur-X proviennent de la fiche entreprise. Le client
reste sélectionné dans le devis.

Les utilisateurs qui ont accès à l'entreprise peuvent choisir les profils
existants. Une fois qu'une facture est finalisée, le profil utilisé et le
devis lié sont protégés. Créez un autre profil pour utiliser de nouvelles
coordonnées sur vos prochains devis. Un profil doit être détaché de tous les
devis avant de pouvoir être supprimé.

Les sauvegardes JSON incluent les profils, leurs logos et leur association
aux devis.

Partage
-------

Dans **Mon entreprise**, recherchez un utilisateur Nextcloud et cliquez sur
**Ajouter**. L'utilisateur partagé peut alors sélectionner cette entreprise et
accéder à ses données Gestion. Le propriétaire peut retirer cet accès depuis la
même page.

.. warning::

   Le partage donne accès aux données commerciales de l'entreprise. Vérifiez
   les droits et la politique interne avant d'ajouter un utilisateur.

Suppression
-----------

Le bouton **Supprimer l'entreprise** efface l'entreprise et les données Gestion
qui lui sont rattachées. Effectuez une sauvegarde avant cette opération.
