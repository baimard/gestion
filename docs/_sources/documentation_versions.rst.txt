Choisir la version de la documentation
======================================

Le lien **Version : …**, fixé en bas à gauche de la navigation, permet de lire
le guide correspondant à la version de Gestion installée sur votre Nextcloud.
Cliquez dessus pour ouvrir la liste des versions vers le haut, puis choisissez
votre version. Sur mobile, ouvrez d'abord le menu de navigation : le lien reste
en bas du panneau, même après un défilement du sommaire.

* **Stable** ouvre la documentation de la dernière version disponible parmi
  les versions archivées.
* Un numéro, par exemple **3.4.2**, ouvre les instructions de cette version.
* **Développement** présente les évolutions de la branche principale. Certaines
  peuvent ne pas encore être disponibles sur votre installation.

En changeant de version, vous restez sur le même sujet s'il existe dans le
guide choisi. Sinon, la page d'accueil de cette version s'ouvre.
Les anciennes adresses du site continuent à ouvrir la documentation stable.
Le sélecteur et ses liens fonctionnent aussi sans JavaScript. Il est utilisable
au clavier : Entrée ouvre la liste et Tab permet de parcourir les versions.

Versions actuelles
------------------

La dernière version publiée est **3.4.7** : c'est celle du choix **Stable**.
Les guides de **3.4.0 à 3.4.7** restent consultables individuellement.
La documentation **Développement** prépare **3.4.8**, notamment l'annonce
de recherche de bêta-testeurs de l'application Qonto, réservée à la France.
Cette préparation ne constitue pas une publication de l'application.

Versions conservées
-------------------

L'archivage commence avec Gestion 3.4.0. Les versions antérieures ne sont pas
reconstituées systématiquement. Chaque nouvelle version publiée est ajoutée
à partir de ses propres sources de documentation, sans remplacer les guides
des versions précédentes.

Publication pour les mainteneurs
--------------------------------

Le workflow ``Documentation`` récupère les tags Git et construit un site
regroupant toutes les versions admissibles, ``stable/`` et ``dev/``.
Les tags numériques à partir de 3.4.0 sont utilisés s'ils contiennent les
sources Sphinx et si leur numéro correspond au manifeste de l'application.
Un tag sans sources est ignoré avec un message ; une incohérence de version
interrompt la publication.

Les textes et médias d'une archive viennent du tag correspondant. La mise en
page et les outils de construction sont communs pour conserver un sélecteur
fonctionnel sur les anciennes pages. Les tags publiés doivent être conservés.

La publication est déclenchée par une modification de la documentation sur
``master``, un nouveau tag de version ou une release publiée. Elle peut aussi
être relancée manuellement. Les pull requests vérifient la construction sans
déployer le site public.

Pour vérifier localement :

.. code-block:: console

   git fetch origin --tags
   python -m pip install -r documentation/requirements.txt
   python -m unittest discover -s documentation -p 'test_*.py'
   python documentation/build_versions.py
   python -m http.server --directory documentation/build/versions

Le fichier ``versions.json`` récapitule les versions et leurs commits sources.
Le déploiement public utilise l'artefact de ce workflow depuis ``master``.
La branche ``gh-pages`` conserve une copie des guides ; sa mise à jour seule
ne remplace pas le site multiversion publié par le workflow.
