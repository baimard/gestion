<?php
    style('gestion', ['style']);
    script('gestion', ['documentTemplates.app']);
?>
<div id="app">
    <div id="app-navigation">
        <?php print_unescaped($this->inc('navigation/index')); ?>
        <?php print_unescaped($this->inc('settings/index')); ?>
    </div>
    <div id="app-content">
        <div id="app-content-wrapper">
            <?php print_unescaped($this->inc('content/changelog')); ?>
            <?php print_unescaped($this->inc('content/document_templates')); ?>
        </div>
    </div>
</div>
