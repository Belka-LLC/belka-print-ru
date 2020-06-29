<?php

/**
 *  Anonses
 *  Home Page
 */
?>
<div class="page__anonses">
  <?php foreach ($rows as $id => $row) : ?>
    <article class="anons">
      <div class="anons__wrap content">
        <?php print $row; ?>
      </div>
    </article>
  <?php endforeach; ?>
</div>
