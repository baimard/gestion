<div syle="display: none;" id="modalConfig" class="modal">
	<div class="modal-content">
		<span class="modalClose">&times;</span>
		<h2><?php p($l->t('Welcome to GESTION')); ?> 2.0.7</h2>
		<p style="margin-bottom:20px;"><b><?php p($l->t('To start with this application you need to configure your company information, follow this link')); ?></b> &#128073; <a href="<?php echo ($_['url']['config']); ?>"><?php p($l->t('My company')); ?></a></p>
		<p style="margin-bottom:20px;">&#9888; <u><?php p($l->t('If you have updated this application, do not forget to clear your cache')); ?></u> &#9888;</p>
		<p style="margin-bottom:20px;"><?php p($l->t('This application is open source and is designed by Benjamin AIMARD.')); ?></p>
		<p style="margin-bottom:20px;">
				<?php p($l->t('If you like my work you can:')); ?> &#129321; <a href="https://www.buymeacoffee.com/benjaminaimard"><?php p($l->t('buy me a coffee')); ?></a> &#129321;
		<br/>	<?php p($l->t('If you need documentation, follow this link')); ?> &#128073; <a href="https://baimard.github.io/gestion/"><?php p($l->t('Documentation')); ?></a>
		<br/>	<?php p($l->t('Others questions?')); ?> &#128073; <a href="mailto:contact@cybercorp.fr"><?php p($l->t('Contact')); ?></a>
		<br/>	<?php p($l->t('Leave me a comment, but only if you like this application :)')); ?> &#128073; <a href="https://apps.nextcloud.com/apps/gestion"><?php p($l->t('Nextcloud apps')); ?></a>
		<br/>	<?php p($l->t('Want to talk with the community?')); ?> &#128073; <a href="https://github.com/baimard/gestion/discussions"><?php p($l->t('Git discussion')); ?></a>
		<hr />
		<h2><?php p($l->t('Changelog')); ?></h2>
		<?php p($l->t('You can now add a logo to your invoices or quotes! To do this, drop a logo.png file in the .gestion folder at the root of your nextcloud directories. (Remember to show hidden files)')); ?>
		<p><a href="https://github.com/baimard/gestion/releases"><?php p($l->t('Releases')); ?></a></p>
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

<div id="ConfigurationHelp" class="modal">
	<div class="modal-content">
		<span class="modalClose">&times;</span>
		<h2><?php p($l->t('Configuration help')); ?></h2>
		<hr/>
		<h2><?php p($l->t('Company name')); ?></h2>
		<div class="ConfigurationHelp"><?php p($l->t('This is the name of the company that will appear in the footer of your quote and invoice. For example, you can set: "Company: Cybercorp" or just "Cybercorp".')); ?></div>
		<h2><?php p($l->t('Your company contact first name')); ?></h2>
		<div class="ConfigurationHelp"><?php p($l->t('First name appears in the Quote/Invoice header as a contact.')); ?></div>
		<h2><?php p($l->t('Your company contact last name')); ?></h2>
		<div class="ConfigurationHelp"><?php p($l->t('Last name appears in the Quote/Invoice header as a contact.')); ?></div>
		<h2><?php p($l->t('Company legal information line one')); ?></h2>
		<div class="ConfigurationHelp"><?php p($l->t('This is the first line in the footer of your Quote/Invoice with all legal information you need.')); ?></div>
		<h2><?php p($l->t('Company legal information line two')); ?></h2>
		<div class="ConfigurationHelp"><?php p($l->t('This is the second line in the footer of your Quote/Invoice with all legal information you need.')); ?></div>
		<h2><?php p($l->t('Your company address')); ?></h2>
		<div class="ConfigurationHelp"><?php p($l->t('Show company address in the Quote/Invoice header.')); ?></div>
		<h2><?php p($l->t('Your company phone')); ?></h2>
		<div class="ConfigurationHelp"><?php p($l->t('Show phone number in the Quote/Invoice header.')); ?></div>
		<h2><?php p($l->t('Your company email')); ?></h2>
		<div class="ConfigurationHelp"><?php p($l->t('E-mail address which appears in the header of the Quote/Invoice.')); ?></div>
		<h2><?php p($l->t('Your company VAT rate')); ?></h2>
		<div class="ConfigurationHelp"><?php p($l->t('Global Default VAT rate apply to your Quote/Invoice (globally), to change it, just insert VAT rate amount without the percent sign.')); ?></div>	
		<h2><?php p($l->t('Automatically generated invoice number')); ?></h2>
		<div class="ConfigurationHelp"><?php p($l->t('If you want to automatically generated an invoice number, set to enable. If you want to be free, set disable. You can enable and disable when you want.')); ?></div>	
		<h2><?php p($l->t('Global default Currency')); ?></h2>
		<div class="ConfigurationHelp"><?php p($l->t('Global currency for the application.')); ?></div>
		<h2><?php p($l->t('Legal disclaimer/mentions')); ?></h2>
		<div class="ConfigurationHelp"><?php p($l->t('Legal disclaimer/mentions you need in your footer - before company information.')); ?></div>
	</div>
</div>
