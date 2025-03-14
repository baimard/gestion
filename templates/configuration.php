<?php
	style('gestion', array('style'));
	script('gestion', array('configuration.app', '814.app', '856.app'));
?>

<div id="app">
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