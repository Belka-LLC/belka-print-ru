<?php

$databases = array (
  'default' => 
  array (
    'default' => 
    array (
      'driver' => 'mysql',
      'database' => 'belkap_print',
      'username' => 'belkap_admin',
      'password' => 'XXAK567819',
      'host' => 'localhost',
      'port' => '',
      'prefix' => '',
    ),
  ),
);

$update_free_access = TRUE;

$drupal_hash_salt = 'YV-Xp9ppicYbR9CArFjlLvm__DPdRgIAFiGTYloWlK0';


ini_set('session.gc_probability', 1);
ini_set('session.gc_divisor', 100);

ini_set('session.gc_maxlifetime', 200000);

ini_set('session.cookie_lifetime', 2000000);


$conf['404_fast_paths_exclude'] = '/\/(?:styles)|(?:system\/files)\//';
$conf['404_fast_paths'] = '/\.(?:txt|png|gif|jpe?g|css|js|ico|swf|flv|cgi|bat|pl|dll|exe|asp)$/i';
$conf['404_fast_html'] = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML+RDFa 1.0//EN" "http://www.w3.org/MarkUp/DTD/xhtml-rdfa-1.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><title>404 Not Found</title></head><body><h1>Not Found</h1><p>The requested URL "@path" was not found on this server.</p></body></html>';


