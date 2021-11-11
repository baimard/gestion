<div id="app-settings">
	<div id="app-settings-header">
		<button class="settings-button" data-apps-slide-toggle="#app-settings-content">
			<?php p($l->t('Configuration'));?>
		</button>
	</div>
	<div id="app-settings-content">
		<ul>
			<li><span class="icon-rename"></span><a href="<?php echo($_['url']['config']); ?>"><button><?php p($l->t('My company'));?></button></a></li>
			<li><label><?php p($l->t('Save folder'));?></label><input id="theFolder" data-table="configuration" data-column="path" data-id="" type="text" placeholder="Veuillez choisir un dossier"></li>
		</ul>
	</div>
</div>
