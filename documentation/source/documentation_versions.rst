Choisir la version de la documentation
======================================

Le menu **Version de la documentation**, dans la navigation, permet de lire
le guide correspondant à la version de Gestion installée sur votre Nextcloud.
Sur mobile, ouvrez d'abord le menu de navigation.

* **Stable** ouvre la documentation de la dernière version disponible parmi
  les versions archivées.
* Un numéro, par exemple **3.4.2**, ouvre les instructions de cette version.
* **Développement** présente les évolutions de la branche principale. Certaines
  peuvent ne pas encore être disponibles sur votre installation.

En changeant de version, vous restez sur le même sujet s'il existe dans le
guide choisi. Sinon, la page d'accueil de cette version s'ouvre.
Les anciennes adresses du site continuent à ouvrir la documentation stable.
Sans JavaScript, des liens vers les versions restent disponibles dans le menu.

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
