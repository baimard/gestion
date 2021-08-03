<div id="app-settings">
	<div id="app-settings-header">
		<button class="settings-button" data-apps-slide-toggle="#app-settings-content">
			<?php p($l->t('Configuration'));?>
		</button>
	</div>
	<div id="app-settings-content">
		<ul>
			<li><label><?php p($l->t('Save folder'));?></label><input id="theFolder" data-table="configuration" data-column="path" data-id="" type="text" placeholder="Veuillez choisir un dossier"></li>
			<li><span class="icon-rename"></span><a href="/apps/gestion/config"><?php p($l->t('My company'));?></a></li>
		</ul>
	</div>
</div>
