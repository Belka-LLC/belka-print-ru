<header class="page__header navbar-expand-md">
  <?php print render($page['notice']); ?>
  <?php if ($title) : ?><h1 class="sr-only"><?php print $title; ?></h1><?php endif; ?>
  <nav class="main-nav">

    <?php if ($logo) : ?>
      <a class="main-nav__logo" title="<?php print t('Home'); ?>">
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
  <?php print $messages; ?>
  <!-- region region-content -->
  <?php print render($page['content']); ?>

</main>

<?php if (!empty($page['footer'])) : ?>
  <?php print render($page['footer']); ?>
<?php endif; ?>

<?php if (!empty($page['help'])) : ?>
  <?php print render($page['help']); ?>
<?php endif; ?>
