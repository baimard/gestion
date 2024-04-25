<ul class="app-navigation">
	<li class="app-navigation-item"><center><b><?php p($l->t('COMPANY'));?></b></center></li>
	<li class="app-navigation-entry">
		<select style="width:95%; margin-left:7px;" name="CurrentCompany" id="CurrentCompany-select">
			<?php foreach ($_['CompaniesList'] as $key => $value) {
				$select = ((int)$value['id']===(int)$_['CurrentCompany']) ? 'selected' : '';
				echo "<option value=".$value['id']." $select>".$value['id']." ". $value['entreprise'] ."</option>"; 
				}
			?>
		</select>
	</li>
	<li class="app-navigation-item"><center><b>GESTION</b></center></li>
	<li class="app-navigation-entry">
		<ul class="app-navigation">
			<li class="app-navigation-entry">
				<a class="nav-link" href="<?= $_['url']['index']; ?>">
					<NcAppNavigationItem name="Loading Item" :loading="true" /> <?php p($l->t('Customers')); ?>
				</a>
				<span class="nav-stats" id="statsclient">
					<div class="loader"></div>
				</span>
			</li>
			<li class="app-navigation-entry">
				<a class="nav-link" href="<?= $_['url']['devis']; ?>">
					<?php p($l->t('Quotes')); ?>
				</a>
				<span class="nav-stats" id="statsdevis">
					<div class="loader"></div>
				</span>
			</li>
			<li class="app-navigation-entry">
				<a class="nav-link" href="<?= $_['url']['facture']; ?>">
					<?= $l->t('Invoices'); ?>
				</a>
				<span class="nav-stats" id="statsfacture">
					<div class="loader"></div>
				</span>
			</li>
			<li class="app-navigation-entry">
				<a class="nav-link" href="<?= $_['url']['produit']; ?>">
					<?= $l->t('Products'); ?>
				</a>
				<span class="nav-stats" id="statsproduit">
					<div class="loader"></div>
				</span>
			</li>
		</ul>
	</li>
	<li class="app-navigation-item"><center><b><?= p($l->t('INFORMATION'));?></b></center></li>
	<li class="app-navigation-entry">
		<ul class="app-navigation">
			<li class="app-navigation-entry"><a href="<?= ($_['url']['statistique']); ?>"><?= p($l->t('Statistics'));?></a></li>
			<li class="app-navigation-entry"><a href="<?= ($_['url']['legalnotice']); ?>"><?= p($l->t('Legal notice'));?></a></li>
		</ul>
	</li>
	<li class="app-navigation-item"><center><b><?= p($l->t('Save folder'));?></b></center></li>
	<li class="app-navigation-entry">
		<input style="margin-left:10px;width:270px;" id="theFolder" data-table="configuration" data-column="path" data-id="" type="text" placeholder="<?= p($l->t('Please choose a folder'));?>">
	</li>
	
	<li><center><a href="#"><button id="about" style="margin-left:10px;width:270px;"><?php p($l->t('About'));?></button></a></center></li>
	<li><center><a href="<?= ($_['url']['config']); ?>"><button style="margin-left:10px;width:270px;"><?php p($l->t('My company'));?></button></a></center></li>
</ul>
