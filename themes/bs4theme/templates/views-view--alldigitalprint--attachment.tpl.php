<nav class="page__side-menu">
  <div>
    <?php if ($header) : ?>
      <h3><?php print $header; ?></h3>
    <?php endif; ?>
    <?php if ($rows) : ?>
      <?php print $rows; ?>
    <?php endif; ?>
  </div>
</nav>
