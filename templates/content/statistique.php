<div id="contentTable" class="gestion-statistics-page">
    <header class="gestion-page-heading">
        <div class="gestion-heading-title">
            <?php print_unescaped($this->inc('navigation/toggle')); ?>
            <div><h1><?php p($l->t('Statistics')); ?></h1>
            <p><?php p($l->t('Follow your monthly turnover and annual totals.')); ?></p></div>
        </div>
    </header>
    <section class="gestion-card gestion-statistics-card" aria-labelledby="statistics-heading">
        <div class="gestion-card-heading"><span class="gestion-section-icon material-symbols-outlined" aria-hidden="true">bar_chart</span>
            <h2 id="statistics-heading"><?php p($l->t('Monthly turnover without VAT')); ?></h2>
        </div>
        <p class="gestion-hint" id="statistics-description"><?php p($l->t('Amounts excluding VAT, grouped by settlement month.')); ?></p>
        <p id="statistics-status" class="gestion-statistics-status" role="status"><?php p($l->t('Loading statistics…')); ?></p>
        <div class="gestion-statistics-scroll" role="region" tabindex="0" aria-labelledby="statistics-heading" aria-describedby="statistics-description" hidden>
        <table id="Statistical" aria-labelledby="statistics-heading">
            <thead>
                <tr>
                    <th scope="col"><?php p($l->t('Year'));?></th>
                    <th scope="col"><?php p($l->t('January'));?></th>
                    <th scope="col"><?php p($l->t('February'));?></th>
                    <th scope="col"><?php p($l->t('March'));?></th>
                    <th scope="col"><?php p($l->t('April'));?></th>
                    <th scope="col"><?php p($l->t('May'));?></th>
                    <th scope="col"><?php p($l->t('June'));?></th>
                    <th scope="col"><?php p($l->t('July'));?></th>
                    <th scope="col"><?php p($l->t('August'));?></th>
                    <th scope="col"><?php p($l->t('September'));?></th>
                    <th scope="col"><?php p($l->t('October'));?></th>
                    <th scope="col"><?php p($l->t('November'));?></th>
                    <th scope="col"><?php p($l->t('December'));?></th>
                    <th scope="col"><?php p($l->t('Total'));?></th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
        </div>
    </section>
</div>
