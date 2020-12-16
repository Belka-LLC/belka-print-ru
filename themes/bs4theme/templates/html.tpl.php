<?php
  global $base_root, $theme_path;
  $theme_path = $base_root . '/' .$theme_path;
?>
<!DOCTYPE html>
<html lang="ru-RU">

<head>
  <title><?php print $head_title; ?></title>
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="theme-color" content="#fd7e14">
  <?php print $head; ?>
  <link rel="preload" as="font" type="font/woff" crossorigin href="<?php print $theme_path; ?>/fonts/didact-gothic-cyr-regular.woff2">
  <link rel="preload" as="font" type="font/woff" crossorigin href="<?php print $theme_path; ?>/fonts/didact-gothic-cyr-bold.woff2">
  <link rel="icon" href="<?php print $theme_path; ?>/img/favicon.svg" type="image/svg+xml">
  <?php print $styles; ?>
</head>

<body class="page <?php print $classes; ?>" data-spy="scroll" data-target=".local-menu" data-offset="60" <?php print $attributes; ?>>
  <?php print $page_top; ?>
  <?php print $page; ?>
  <?php print $scripts; ?>
  <script type="module" src="<?php print $theme_path; ?>/js/bundle.js"></script>
  <script nomodule src="<?php print $theme_path; ?>/js/bundle.es5.js"></script>
  <?php print $page_bottom; ?>
</body>

</html>
