<?php

include('includes/init.inc.php');

/* start the template engine */
$home = new Template('home');

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

  'font-awesome.min' => [

    'type' => 'external',
    'log'  => true

  ],

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
$home->_include('footer');
$home->_include('modals');

// $home->set_ip_address(client_ip_address());

/* load javascript into the page body */
$home->set('javascript_body', $home->load_js([

  '_globals' => [

    'type'      => 'internal',
    'condition' => null,
    'log'       => true

  ],

  '_jquery-2.1.4.min' => [

    'type'      => 'external',
    'condition' => null,
    'log'       => true

  ],

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

]));

/* build the page */
$home->build_page();
