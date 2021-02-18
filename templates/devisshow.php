<?php
vendor_style('gestion', ['twbs/bootstrap/dist/css/bootstrap.min']);
vendor_script('gestion', ['twbs/bootstrap/dist/js/bootstrap.bundle']);
style('gestion', ['style']);
script('gestion', 'scriptnavigation')
?>

<div id="app">
	<div id="app-navigation">
		<?php print_unescaped($this->inc('navigation/index')); ?>
		<?php print_unescaped($this->inc('settings/index')); ?>
	</div>

	<div id="app-content">
		<div id="app-content-wrapper">
			<?php print_unescaped($this->inc('content/devisshow')); ?>
		</div>
	</div>
</div>