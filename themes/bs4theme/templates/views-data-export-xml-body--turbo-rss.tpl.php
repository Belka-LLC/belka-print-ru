<?php global $base_root; ?>

<?php foreach ($themed_rows as $count => $row) : ?>
  <item turbo="true">
    <link><?php print $base_root . $row['path']; ?></link>
    <turbo:content>
      <![CDATA[
      <header>
        <h1><?php print $row['title']; ?></h1>
      </header>
      <?php foreach ($row as $field => $content) : ?>
<?php if (($field != 'path') && ($field != 'title')) print $content . "\n"; ?>
      <?php endforeach; ?>
    ]]>
    </turbo:content>
  </item>
<?php endforeach; ?>
