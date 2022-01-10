<div syle="display: none;" id="modalConfig" class="modal">
	<div class="modal-content">
		<span class="modalClose">&times;</span>
		<h2><?php p($l->t('Welcome to GESTION')); ?></h2>
		<p style="margin-bottom:20px;"><b><?php p($l->t('To start with this application you need to configure your company information, follow this link')); ?></b> &#128073; <a href="<?php echo ($_['url']['config']); ?>"><?php p($l->t('My company')); ?></a></p>
		<br />
		<p style="margin-bottom:20px;"><?php p($l->t('This application is an open source application designed by Benjamin AIMARD. If you like my work you can')); ?> &#129321; <a href="https://www.buymeacoffee.com/benjaminaimard"><?php p($l->t('buy me a coffee')); ?></a> &#129321;</p>
		<p style="margin-bottom:20px;"><?php p($l->t('If you need documentation, follow this link')); ?> &#128073; <a href="https://baimard.github.io/gestion/"><?php p($l->t('Documentation')); ?></a></p>
		<p style="margin-bottom:20px;"><?php p($l->t('Others questions?')); ?> &#128073; <a href="mailto:contact@cybercorp.fr"><?php p($l->t('Contact')); ?></a></p>
		<p style="margin-bottom:20px;"><?php p($l->t('Leave me a comment, but only if you like this application :)')); ?> &#128073; <a href="https://apps.nextcloud.com/apps/gestion"><?php p($l->t('Nextcloud apps')); ?></a></p>
		<p style="margin-bottom:20px;"><?php p($l->t('Want to talk with the community?')); ?> &#128073; <a href="https://github.com/baimard/gestion/discussions"><?php p($l->t('Git discussion')); ?></a></p>
		<hr />
		<h2><?php p($l->t('Changelog')); ?> v1.3.1.1</h2>
		<p>
		<ul>
			<li>Design</li>
			<li>Statistical function</li>
			<li>Bugs correction</li>
			<li>Auto invoice number (European law)</li>
		</ul>
		l10n: Removed blank by @rakekniven in #79
		l10n: Changed grammar by @rakekniven in #80
		1.3.1 by @baimard in #85
		</p>
	</div>
</div>

<div id="modalMail" class="modal">
	<div class="modal-content">
		<span class="modalClose">&times;</span>
		<h2><?php p($l->t('Send an email')); ?></h2>
		<input id="subject" style="width:100%" type="text" value="<?php p($l->t('Your invoice/quote')); ?>" />
		<textarea style="width:100%" id="body">
			<?php p($l->t('Dear,')); ?>
			<br/>
			<?php p($l->t('Attached to this email you will find a new document.')); ?>
			<br/>
			<?php p($l->t('Best regards,')); ?>
		</textarea>
		<button id="sendmail"><?php p($l->t('Send')); ?></button>
	</div>
</div>
