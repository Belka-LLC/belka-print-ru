<?php

/**
 *  Anonses
 *  Home Page
 */
?>
<?php $counter = 1 ?>
<div class="page__anonses">
  <?php foreach ($rows as $id => $row) : ?>
    <article class="anons anons--<?= ($counter % 2 == 0) ? 'even' : 'odd' ?>">
      <div class="anons__wrap content">
        <?php print $row; ?>
      </div>
    </article>
    <?php $counter++ ?>
  <?php endforeach; ?>
</div>
