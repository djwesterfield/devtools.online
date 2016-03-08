<?php

define('DEV_MODE', $DEV_MODE);
define('PRODUCTION', $PRODUCTION);

define('CRYPTO_KEY', 'syCzXjxJAzrFX5re');
define('CRYPTO_METHOD', 'aes128');

define('DATABASE_CONNECT',  $DATABASE_CONNECT);
define('DATABASE_HOST',     $DATABASE_HOST);
define('DATABASE_TABLE',    $DATABASE_TABLE);
define('DATABASE_USERNAME', $DATABASE_USERNAME);
define('DATABASE_PASSWORD', $DATABASE_PASSWORD);

define('GA_TRACKING_UAT',   $GA_TRACKING_UAT);
define('GA_TRACKING_PROD',  $GA_TRACKING_PROD);

define('SITE_IMAGE',        $SITE_IMAGE);
define('SITE_TITLE',        $SITE_TITLE);
define('SITE_DESCRIPTION',  $SITE_DESCRIPTION);
define('SITE_KEYWORDS',     $SITE_KEYWORDS);

define('FACEBOOK_IMAGE',       (!empty($FACEBOOK_IMAGE)       ? $FACEBOOK_IMAGE       : SITE_IMAGE));
define('FACEBOOK_TITLE',       (!empty($FACEBOOK_TITLE)       ? $FACEBOOK_TITLE       : SITE_TITLE));
define('FACEBOOK_DESCRIPTION', (!empty($FACEBOOK_DESCRIPTION) ? $FACEBOOK_DESCRIPTION : SITE_DESCRIPTION));

define('TWITTER_CARD',         (!empty($TWITTER_CARD)         ? $TWITTER_CARD         : 'summary'));
define('TWITTER_IMAGE',        (!empty($TWITTER_IMAGE)        ? $TWITTER_IMAGE        : SITE_IMAGE));
define('TWITTER_TITLE',        (!empty($TWITTER_TITLE)        ? $TWITTER_TITLE        : SITE_TITLE));
define('TWITTER_DESCRIPTION',  (!empty($TWITTER_DESCRIPTION)  ? $TWITTER_DESCRIPTION  : SITE_DESCRIPTION));

define('SERVER_ROOT', getcwd().'/');
define('SERVER_NAME', (!empty($_SERVER['HTTPS']) ? 'https' : 'http').'://'.$_SERVER['HTTP_HOST'].'/'.$TEMP_PATH);

define('SITE_MANIFEST', SERVER_NAME.'manifest.json');
define('SITE_FAVICON',  SERVER_NAME.'favicon.ico');

define('TEMPLATES_PATH', SERVER_ROOT.'templates/');

define('JAVASCRIPT',                SERVER_NAME.'assets/javascript/');
define('JAVASCRIPT_ROOT',           SERVER_ROOT.'assets/javascript/');

define('JAVASCRIPT_INTERNAL',       JAVASCRIPT.'internal/');
define('JAVASCRIPT_INTERNAL_ROOT',  JAVASCRIPT_ROOT.'internal/');
define('JAVASCRIPT_EXTERNAL',       JAVASCRIPT.'external/');
define('JAVASCRIPT_EXTERNAL_ROOT',  JAVASCRIPT_ROOT.'external/');

define('STYLESHEETS',               SERVER_NAME.'assets/stylesheets/');
define('STYLESHEETS_ROOT',          SERVER_ROOT.'assets/stylesheets/');

define('STYLESHEETS_INTERNAL',      STYLESHEETS.'internal/');
define('STYLESHEETS_INTERNAL_ROOT', STYLESHEETS_ROOT.'internal/');
define('STYLESHEETS_EXTERNAL',      STYLESHEETS.'external/');
define('STYLESHEETS_EXTERNAL_ROOT', STYLESHEETS_ROOT.'external/');
