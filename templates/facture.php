<?php
style('gestion', ['style','datatables.min']);
script('gestion', ['scriptnavigation','jquery4','datatables.min','datatables.min4','scriptfacture']);
?>

<div id="app">
	<div id="app-navigation">
		<?php print_unescaped($this->inc('navigation/index')); ?>
		<?php print_unescaped($this->inc('settings/index')); ?>
	</div>

	<div id="app-content">
		<div id="app-content-wrapper">
			<?php print_unescaped($this->inc('content/facture')); ?>
		</div>
	</div>
</div>

