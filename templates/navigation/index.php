<ul class="app-navigation">
	<li class="app-navigation-entry"><span class="navmarg"></span><b><?php p($l->t('Manage'));?></b></li>
	<li class="app-navigation-entry">
		<ul class="app-navigation">
			<li class="app-navigation-entry"><span class="navmarg icon-contacts-dark"></span><a class="a-entry" href="<?php echo($_['url']['index']); ?>"><?php p($l->t('Customers'));?></a>
				<div class="app-navigation-entry-utils">
					<ul>
					<li class="app-navigation-entry-utils-counter"><span id="statsclient"><div class="loader"></div></span></li>
					</ul>
				</div>
			</li>
			<li class="app-navigation-entry"><span class="navmarg icon-template-add"></span><a href="<?php echo($_['url']['devis']); ?>"><?php p($l->t('Quotes'));?></a>
				<div class="app-navigation-entry-utils">
					<ul>
					<li class="app-navigation-entry-utils-counter"><span id="statsdevis"><div class="loader"></div></span></li>
					</ul>
				</div>
			</li>
			<li class="app-navigation-entry"><span class="navmarg icon-toggle-pictures"></span><a href="<?php echo($_['url']['facture']); ?>"><?php p($l->t('Invoices'));?></a>
				<div class="app-navigation-entry-utils">
					<ul>
						<li class="app-navigation-entry-utils-counter"><span id="statsfacture"><div class="loader"></div></span></li>
					</ul>
				</div>	
			</li>
			<li class="app-navigation-entry"><span class="navmarg icon-category-integration"></span><a href="<?php echo($_['url']['produit']); ?>"><?php p($l->t('Products'));?></a>
				<div class="app-navigation-entry-utils">
					<ul>
					<li class="app-navigation-entry-utils-counter"><span id="statsproduit"><div class="loader"></div></span></li>
					</ul>
				</div>	
			</li>
		</ul>
	</li>
	<li class="app-navigation-entry"><span class="navmarg"></span><b><?php p($l->t('Information'));?></b></li>
	<li class="app-navigation-entry">
		<ul class="app-navigation">
			<li class="app-navigation-entry"><span class="navmarg icon-toggle-pictures"></span><a href="<?php echo($_['url']['statistique']); ?>"><?php p($l->t('Statistics'));?></a></li>
			<li class="app-navigation-entry"><span class="navmarg icon-toggle-pictures"></span><a href="<?php echo($_['url']['legalnotice']); ?>"><?php p($l->t('Legal notice'));?></a></li>
		</ul>
	</li>
	
	<li title="FIX https://github.com/baimard/gestion/issues/351" class="app-navigation-entry"><span class="navmarg"></span><b><?php p($l->t('Save folder'));?></b></li>
	<li><input style="margin-left:10px;width:270px;" id="theFolder" data-table="configuration" data-column="path" data-id="" type="text" placeholder="<?php p($l->t('Please choose a folder'));?>"></li>
	
	<li><center><a href="#"><button id="about" style="margin-left:10px;width:270px;"><?php p($l->t('About'));?></button></a></center></li>
	<li><center><a href="<?php echo($_['url']['config']); ?>"><button style="margin-left:10px;width:270px;"><?php p($l->t('My company'));?></button></a></center></li>
</ul>
