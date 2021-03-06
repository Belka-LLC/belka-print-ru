<?php print render($page['notice']); ?>
<header class="page__header navbar-expand-md">
    <?php if ($title) : ?><h1 class="sr-only"><?php print $title; ?></h1><?php endif; ?>
    <nav class="main-nav">

        <?php if ($logo) : ?>
            <span class="main-nav__logo">
                <img src="<?php print $logo; ?>" alt="<?php print t('Logo'); ?> " width="150" height="40"/>
        </span>
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

    <?php print $messages; ?>
    <?php print render($page['content']); ?>

<?php if (!empty($page['footer'])) : ?>
    <?php print render($page['footer']); ?>
<?php endif; ?>

<?php if (!empty($page['help'])) : ?>
    <?php print render($page['help']); ?>
<?php endif; ?>
