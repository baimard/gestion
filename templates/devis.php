<?php
style('gestion', ['datatables.min','style']);
script('gestion', ['scriptnavigation','jquery4','datatables.min','datatables.min4','scriptdevis']);
?>

<div id="app">
	<div id="app-navigation">
		<?php print_unescaped($this->inc('navigation/index')); ?>
		<?php print_unescaped($this->inc('settings/index')); ?>
	</div>

	<div id="app-content">
		<div id="app-content-wrapper">
			<?php print_unescaped($this->inc('content/devis')); ?>
		</div>
	</div>
</div>

