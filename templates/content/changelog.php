<div id="modalConfig" class="modalConfig">
	<div class="modal-content">
		<span class="modalClose">&times;</span>
		<h2><?php p($l->t('Welcome to GESTION'));?></h2>
		<p style="margin-bottom:20px;"><b><?php p($l->t('To start with this application you need to configure your company information, follow this link'));?></b> &#128073; <a href="<?php echo($_['url']['config']); ?>"><?php p($l->t('My company'));?></a></p>
		<p style="margin-bottom:20px;"><?php p($l->t('This application is an open source application design by Benjamin AIMARD. If you like my work you can'));?> &#129321; <a href="https://www.buymeacoffee.com/benjaminaimard"><?php p($l->t('buy me a coffee'));?></a> &#129321;</p>
		<p style="margin-bottom:20px;"><?php p($l->t('If you need documentation, follow this link'));?> &#128073; <a href="https://baimard.github.io/gestion/"><?php p($l->t('Documentation'));?></a></p>
		<p style="margin-bottom:20px;"><?php p($l->t('Others questions?'));?> &#128073; <a href="mailto:contact@cybercorp.fr"><?php p($l->t('Contact'));?></a></p>
		<p style="margin-bottom:20px;"><?php p($l->t('Only if you like this application :), let me a comment!'));?> &#128073; <a href="https://apps.nextcloud.com/apps/gestion"><?php p($l->t('Nextcloud apps'));?></a></p>
		<hr/>	
		<h2><?php p($l->t('Change log'));?> v1.2.0</h2>
		<p>
			<ul>
				<li><?php p($l->t('Possibility to add comment in quote'));?></li>
				<li><?php p($l->t('Global VAT rate'));?></li>
				<li><?php p($l->t('Add version for quote and invoice'));?></li>
				<li><?php p($l->t('States for invoice and quote, like sent, canceled or whatever you want'));?></li>
				<li><?php p($l->t('All libraries updated'));?></li>
				<li><?php p($l->t('Multiple bugs corrections'));?></li>
			</ul>
		</p>
	</div>
</div>
