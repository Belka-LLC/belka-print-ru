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
?>
<section class="<?php print $classes; ?>" <?php print $attributes; ?>>
<?php print render($title_prefix); ?>
<?php if ($block->subject) : ?>
<h4 <?php print $title_attributes; ?>><?php print $block->subject ?></h4>
<?php endif; ?>
<?php if ($info) : ?>
<h4 class="sr-only"><?php print $info->info ?></h4>
<?php endif; ?>
<?php print render($title_suffix); ?>
<?php print $content ?>
</section>
