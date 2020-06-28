<div class="page__content content" id="node-<?php print $node->nid; ?>" <?php print $attributes; ?>>

  <?php print render($title_prefix); ?>
  <?php if (!$page): ?>
    <h2<?php print $title_attributes; ?>><a href="<?php print $node_url; ?>"><?php print $title; ?></a></h2>
  <?php endif; ?>
  <?php print render($title_suffix); ?>

  <div class="content__wrap"<?php print $content_attributes; ?>>
    <?php
      print render($content);
    ?>
  </div>

</div>
