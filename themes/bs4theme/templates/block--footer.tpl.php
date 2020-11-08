<?php
/**
 * Если название пользовательского блока не задано, то скрытно выводим
 * $info — системное название блока
 */
$info = '';
if ((!$block->subject) && ($block->module == 'block')) {
$info = db_query('SELECT info FROM {block_custom} WHERE bid = :bid', array(':bid' => $block->delta))->fetchObject();
$sr_only = ' class="sr_only"';
}
$contextual_links = user_access('administer nodes') ? ' contextual-links-region' : '';
?>
<section class="footer__section<?php print $contextual_links ?>" <?php print $attributes; ?>>
<?php print render($title_prefix); ?>
<?php if ($block->subject) : ?>
<h2 class="footer__title"><?php print $block->subject ?></h2>
<?php endif; ?>
<?php if ($info) : ?>
<h2 class="sr-only"><?php print $info->info ?></h2>
<?php endif; ?>
<?php print render($title_suffix); ?>
<?php print $content ?>
</section>
