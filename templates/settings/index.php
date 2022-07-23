<div id="app-settings">
	<div id="app-settings-header">
		<button class="settings-button" data-apps-slide-toggle="#app-settings-content">
			<?php p($l->t('Configuration'));?>
		</button>
	</div>
	<div id="app-settings-content">
		<ul>
			<li><center><a href="<?php echo($_['url']['config']); ?>"><button style="width:270px;"><?php p($l->t('My company'));?></button></a></center></li>
			<li><hr/></li>
			<li><label><b><?php p($l->t('Save folder'));?></b></label><input id="theFolder" data-table="configuration" data-column="path" data-id="" type="text" placeholder="<?php p($l->t('Please choose a folder'));?>"></li>
		</ul>
	</div>
</div>
