<?php
style('gestion', ['style','datatables.min']);
script('gestion', ['scriptnavigation','jquery4','datatables.min','datatables.min4','scriptproduit']);
?>

<div id="app">
	<div id="app-navigation">
		<?php print_unescaped($this->inc('navigation/index')); ?>
		<?php print_unescaped($this->inc('settings/index')); ?>
	</div>

	<div id="app-content">
		<div id="app-content-wrapper">
			<?php print_unescaped($this->inc('content/produit')); ?>
		</div>
	</div>
</div>

