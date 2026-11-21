<?php foreach ($_['rows'] as $cells): ?>
    <tr>
        <?php foreach ($cells as $index => $value): ?>
            <td<?php if (count($cells) === 1): ?> colspan="9"<?php elseif (!$_['productRows'] || $index >= 3): ?> class="document-amount"<?php endif; ?>><?php p(html_entity_decode((string)$value, ENT_QUOTES, 'UTF-8')); ?></td>
        <?php endforeach; ?>
    </tr>
<?php endforeach; ?>
