<?php

/**
 * $title - Заголовок страницы
 * $slogan - Слоган страницы
 * $banner - Фон транспоранта
 * $banner - Титульное изображение на транспаранте
 */
if (arg(0) == "node") {
  $slogan = '';
  $banner = '';
  $title_image = '';
  $local_menu = '';
  $local_menu = field_view_field('node', $node, 'field_local_menu');
  if (!empty($node->field_slogan)) $slogan = $node->field_slogan['und'][0]['value'];
  if (!empty($node->field_banner)) $banner = file_create_url($node->field_banner['und'][0]['uri']);
  if (!empty($node->field_title_image)) $title_image = file_create_url($node->field_title_image['und'][0]['uri']);
}
?>

<header class="page__header navbar-expand-md">
  <?php print render($page['notice']); ?>
  <?php if ($title) : ?><h1 class="sr-only"><?php print $title; ?></h1><?php endif; ?>
  <nav class="main-nav">
    <?php if ($logo) : ?>
      <a class="main-nav__logo" href="<?php print $front_page; ?>" title=" <?php print t('Home'); ?>">
        <img src="<?php print $logo; ?>" alt="<?php print t('Logo'); ?>" />
      </a>
    <?php endif; ?>

    <?php if (!empty($page['main_contacts'])) : ?>
      <?php print render($page['main_contacts']); ?>
    <?php endif; ?>

    <button class="main-nav__toggler toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Меню сайта">
      <svg width="30" height="30" viewBox="0 0 30 30" stroke="#000000" stroke-width="4" stroke-linecap="round">
        <path class="main-nav__toggler-icon" d="M2 5 h26 M2 15 h26 M2 25 h26" />
      </svg>
    </button>
  </nav>
  <?php if (!empty($page['main_navigation'])) : ?>
    <?php print render($page['main_navigation']); ?>
  <?php endif; ?>
</header>

<main class="page__main">
  <header>
    <h1 class="page__title"><?php print $title ?></h1>
  </header>

  <?php print $messages; ?>

  <?php if (((!empty($tabs) && (strlen(trim(render($tabs))) > 0))) || (!empty($action_links))) : ?>
    <div class="controls">
      <?php if (!empty($tabs) && (strlen(trim(render($tabs))) > 0)) : ?>
        <?php print render($tabs); ?>
      <?php endif; ?>

      <?php if (!empty($action_links)) : ?>
        <ul class="nav nav-pills action-links"><?php print render($action_links); ?></ul>
      <?php endif; ?>
    </div>
  <?php endif; ?>
  <?php if ((arg(0) == "node") && ($local_menu)) : ?>
    <nav class="page__local-menu">
      <?php print drupal_render($local_menu);
      ?>
    </nav>
  <?php endif; ?>

  <div class="page__content content">
    <div class="content__wrap">
      <?php print render($page['content']); ?>
    </div>
  </div>
</main>

<?php if (!empty($page['footer'])) : ?>
  <?php print render($page['footer']); ?>
<?php endif; ?>

<?php if (!empty($page['help'])) : ?>
  <?php print render($page['help']); ?>
<?php endif; ?>
