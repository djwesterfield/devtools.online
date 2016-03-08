<?php

/**
  * Set some configuration settings
  * that will be passed into global
  * variables, used throughout the
  * rest of the template.
  *
  */

$DEV_MODE = false;

/**
  * Temporary development path that the
  * boilerplate currently resides in.
  * This will have to be changed to an
  * empty string before production.
  */

$TEMP_PATH = 'devtools.online/';

/**
  * Google Analytics tracking codes.
  * Two tracking codes should be available
  * at all times, UAT key for testing,
  * and a PROD key for production.
  */

$DATABASE_CONNECT  = false;
$DATABASE_HOST     = '';
$DATABASE_TABLE    = '';
$DATABASE_USERNAME = '';
$DATABASE_PASSWORD = '';

/**
  * Google Analytics tracking codes.
  * Two tracking codes should be available
  * at all times, UAT key for testing,
  * and a PROD key for production.
  */

$GA_TRACKING_UAT  = 'UA-UATXX-X';
$GA_TRACKING_PROD = 'UA-PRODX-X';

/**
  * Meta information for search engine optimization.
  * Set the page title, description, and keywords.
  *
  */

$SITE_IMAGE       = 'http://placehold.it/400x200';
$SITE_TITLE       = 'DevTools Online | A Massive Collection of Tools, Links, and Resources';
$SITE_DESCRIPTION = 'A massive online collection of tools, links, and resources for web designers & developers.';
$SITE_KEYWORDS    = 'devtools, dev tools, online, web design, web development, webdev, applications, advertising, inspiration, google, website builders, version control, social networking, data tracking, seo, marketing, databases, javascript, html, css, php, perl, icons, design, graphic design, sebastian inman, thinkpixels, think pixels';

/**
  * Meta information for sharing the site on Facebook.
  * Set the title, description, and image for sharing.
  *
  */

$FACEBOOK_IMAGE       = $SITE_IMAGE;
$FACEBOOK_TITLE       = $SITE_TITLE;
$FACEBOOK_DESCRIPTION = $SITE_DESCRIPTION;

/**
  * Meta information for sharing the site on Twitter.
  * Set the title, description, and image for sharing.
  *
  */

$TWITTER_IMAGE       = $SITE_IMAGE;
$TWITTER_TITLE       = $SITE_TITLE;
$TWITTER_DESCRIPTION = $SITE_DESCRIPTION;
$TWITTER_CARD        = 'summary_large_image';
