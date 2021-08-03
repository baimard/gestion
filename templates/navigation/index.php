<ul class="app-navigation">
	<li class="app-navigation-entry"><span class="navmarg icon-add"></span><a class="a-entry" href="/apps/gestion"><?php p($l->t('customer'));?></a>
		<div class="app-navigation-entry-utils">
			<ul>
			<li class="app-navigation-entry-utils-counter"><span id="statsclient"><div class="loader"></div></span></li>
			</ul>
		</div>
	</li>
	<li class="app-navigation-entry"><span class="navmarg icon-template-add"></span><a href="/apps/gestion/devis"><?php p($l->t('Quote'));?></a>
		<div class="app-navigation-entry-utils">
			<ul>
			<li class="app-navigation-entry-utils-counter"><span id="statsdevis"><div class="loader"></div></span></li>
			</ul>
		</div>
	</li>
	<li class="app-navigation-entry"><span class="navmarg icon-toggle-pictures"></span><a href="/apps/gestion/facture"><?php p($l->t('invoice'));?></a>
		<div class="app-navigation-entry-utils">
			<ul>
				<li class="app-navigation-entry-utils-counter"><span id="statsfacture"><div class="loader"></div></span></li>
			</ul>
		</div>	
	</li>
	<li class="app-navigation-entry"><span class="navmarg icon-category-integration"></span><a href="/apps/gestion/produit"><?php p($l->t('product'));?></a>
		<div class="app-navigation-entry-utils">
			<ul>
			<li class="app-navigation-entry-utils-counter"><span id="statsproduit"><div class="loader"></div></span></li>
			</ul>
		</div>	
	</li>
</ul>