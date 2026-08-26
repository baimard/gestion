<?php
	style('gestion', array('style'));
	script('gestion', array('configuration.app'));
?>

<div id="app">
	<?php print_unescaped($this->inc('navigation/toggle')); ?>
	<div id="app-navigation">
		<?php print_unescaped($this->inc('navigation/index')); ?>
		<?php print_unescaped($this->inc('settings/index')); ?>
	</div>

	<div id="app-content">
		<div id="app-content-wrapper">
			<?php print_unescaped($this->inc('content/changelog')); ?>
			<?php print_unescaped($this->inc('modal/configuration_modal')); ?>
			<?php print_unescaped($this->inc('content/configuration')); ?>
		</div>
	</div>
</div>
