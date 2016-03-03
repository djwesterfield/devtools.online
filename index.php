<?php

include('includes/init.inc.php');

/* start the template engine */
$home = new Template('home');

/* load javascript into the page header */
$home->set('javascript_head', $home->load_js([

  'console.min' => [

    'type'      => 'dev',
    'condition' => null,
    'log'       => false

  ],

  'godmode' => [

    'type'      => 'dev',
    'condition' => null,
    'log'       => false

  ],

  'jquery-2.1.4.min' => [

    'type'      => 'external',
    'condition' => '<!--[if gt IE 9]><!-->{file}<!--<![endif]-->',
    'log'       => true

  ],

  'jquery-1.11.3.min' => [

    'type'      => 'external',
    'condition' => '<!--[if lt IE 9]>{file}<!--[endif]-->',
    'log'       => true

  ],

  'modernizr.min' => [

    'type'      => 'external',
    'condition' => '<!--[if lt IE 9]>{file}<!--[endif]-->',
    'log'       => true

  ],

  'globals' => [

    'type'      => 'internal',
    'condition' => null,
    'log'       => true

  ]

]));

$home->set('googlefonts', $home->googlefonts([

  'Open+Sans' => [
    300,
    400,
    600,
    800
  ]

]));

/* load stylesheets into the page header */
$home->set('stylesheets', $home->load_css([

  'reset' => [

    'type' => 'internal',
    'log'  => true

  ],

  'style' => [

    'type' => 'internal',
    'log'  => true

  ]

]));

/* inline template includes */

$home->_include('header');
$home->_include('mobilenav');
$home->_include('sidebar');
$home->_include('content');
$home->_include('info');
$home->_include('footer');

// $home->set_ip_address(client_ip_address());

/* load javascript into the page body */
$home->set('javascript_body', $home->load_js([

  'ga.min' => [

    'type'      => 'external',
    'condition' => null,
    'log'       => true

  ],

  'firebase.min' => [

    'type'      => 'external',
    'condition' => null,
    'log'       => true

  ],

  'pace.min' => [

    'type'      => 'external',
    'condition' => null,
    'log'       => true

  ],

  'typewatch' => [

    'type'      => 'external',
    'condition' => null,
    'log'       => true

  ],

  'mixitup.min' => [

    'type'      => 'external',
    'condition' => null,
    'log'       => true

  ],

  'site' => [

    'type'      => 'internal',
    'condition' => null,
    'log'       => true

  ],

  'konami' => [

    'type'      => 'internal',
    'condition' => null,
    'log'       => false

  ]

]));

/* build the page */
$home->build_page();
