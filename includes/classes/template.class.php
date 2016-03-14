<?php

class Database {

  protected $username;
  protected $password;

  public function __construct($username, $password) {

    // do something

  }

}

class Template {

  protected $_file;
  protected $_values = array();

  public function __construct($_file) {
    $this->file = $_file.'.html.tp';
    $this->god_mode();
    $this->we_are_hiring();
    $this->set_ip_address('IP');
    $this->set_url(SERVER_NAME);
    $this->set_image(SITE_IMAGE);
    $this->set_title(SITE_TITLE);
    $this->set_keywords(SITE_KEYWORDS);
    $this->set_manifest(SITE_MANIFEST);
    $this->set_favicon(SITE_FAVICON);
    $this->set_description(SITE_DESCRIPTION);
    $this->set_facebook_image(FACEBOOK_IMAGE);
    $this->set_facebook_title(FACEBOOK_TITLE);
    $this->set_facebook_description(FACEBOOK_DESCRIPTION);
    $this->set_twitter_card(TWITTER_CARD);
    $this->set_twitter_image(TWITTER_IMAGE);
    $this->set_twitter_title(TWITTER_TITLE);
    $this->set_twitter_description(TWITTER_DESCRIPTION);
    $this->set_tracking_codes(GA_TRACKING_UAT, GA_TRACKING_PROD);
    $this->set_prod_url('https://www.devtools.online/');
    $this->googlefonts([
      'Open+Sans' => [
        300,
        400,
        600
      ]
    ]);
  }


  public function set($_key, $_value) {
    $this->values[$_key] = $_value;
  }


  public function googlefonts($fonts) {

    global $font_response;
    $output = '<link href="https://fonts.googleapis.com/css?family=';

    foreach($fonts as $font => $weights) {

      $output .= $font . ':';

      foreach($weights as $weight) {

        $output .= $weight . ',';

      }

      $output .= '|';

    }

    $output .= '" rel="stylesheet">';

    return $output;

  }

  public function load_css($files) {

    global $css_response;

    $output = '';

    if(DEV_MODE === true) {

      foreach($files as $file => $data) {

        $file = $file.'.css';

        if (!$data['type'] || $data['type'] === null) {
          $source = STYLESHEETS;
          $root   = STYLESHEETS_ROOT;
        }else if($data['type'] === 'internal') {
          $source = STYLESHEETS_INTERNAL.'compiled/';
          $root   = STYLESHEETS_INTERNAL_ROOT.'compiled/';
        }else if($data['type'] === 'external') {
          $source = STYLESHEETS_EXTERNAL;
          $root   = STYLESHEETS_EXTERNAL_ROOT;
        }

        if(file_exists($root.$file)) {

          $output .= '<link rel="stylesheet" href="'.$source.$file.'">';

        }

      }

    }else{

      foreach($files as $file => $data) {

        if($data['type'] === 'external') {

          $source = STYLESHEETS_EXTERNAL;
          $root   = STYLESHEETS_EXTERNAL_ROOT;

          $file = $file.'.css';

          if(file_exists($root.$file)) {

            $output .= '<link rel="stylesheet" href="'.$source.$file.'">';

          }

        }

      }

      $minFile = 'lib.compiled.min.css';
      $output .= '<link rel="stylesheet" href="'.STYLESHEETS_INTERNAL.$minFile.'">';

    }

    return $output;

  }

  public function load_js($files) {

    global $js_response;
    $output = '';

    if(DEV_MODE === true) {

      foreach($files as $file => $data) {

        $file = $file.'.js';

        if (!$data['type'] || $data['type'] === null) {
          $source = JAVASCRIPT;
          $root   = JAVASCRIPT_ROOT;
        }else if($data['type'] === 'internal') {
          $source = JAVASCRIPT_INTERNAL;
          $root   = JAVASCRIPT_INTERNAL_ROOT;
        }else if($data['type'] === 'external') {
          $source = JAVASCRIPT_EXTERNAL;
          $root   = JAVASCRIPT_EXTERNAL_ROOT;
        }else if($data['type'] === 'dev') {
          $source = JAVASCRIPT.'dev/';
          $root   = JAVASCRIPT_ROOT.'dev/';
        }

        if(file_exists($root.$file)) {

          if($data['condition'] !== null) {

            list($open, $close) = explode('{file}', $data['condition']);

            $output .= $open;
            $output .= '<script src="'.$source.$file.'"></script>';
            $output .= $close;

          }else{

            $output .= '<script src="'.$source.$file.'"></script>';

          }

        }

      }

    }else{

      $file_external = 'external.min.js';
      $file_internal = 'internal.min.js';

      $output .= '<script src="'.JAVASCRIPT.$file_external.'"></script>';
      $output .= '<script src="'.JAVASCRIPT.$file_internal.'"></script>';

    }

    return $output;

  }

  public function set_url($url) {
    $this->values['url'] = $url;
  }

  public function set_prod_url($url) {
    $this->values['url:prod'] = $url;
  }

  public function set_image($image) {
    $this->values['image'] = $image;
  }

  public function set_title($title) {
    $this->values['title'] = limit_string_chars($title, 70);
  }

  public function set_description($description) {
    $this->values['description'] = limit_string_chars($description, 155);
  }

  public function set_keywords($keywords) {
    $this->values['keywords'] = $keywords;
  }

  public function set_manifest($manifest) {
    $this->values['manifest'] = $manifest;
  }

  public function set_favicon($favicon) {
    $this->values['favicon'] = $favicon;
  }

  public function set_facebook_image($image) {
    $this->values['og:image'] = $image;
  }

  public function set_facebook_title($title) {
    $this->values['og:title'] = $title;
  }

  public function set_facebook_description($description) {
    $this->values['og:description'] = $description;
  }

  public function set_twitter_card($card) {
    $this->values['twitter:card'] = $card;
  }

  public function set_twitter_image($image) {
    $this->values['twitter:image'] = $image;
  }

  public function set_twitter_title($title) {
    $this->values['twitter:title'] = $title;
  }

  public function set_twitter_description($description) {
    $this->values['twitter:description'] = $description;
  }

  public function set_tracking_codes($uat, $prod) {

    $output = "<script>";
    $output .= "var _gaq = _gaq || [];";
    $output .= "_gaq.push(['_setAccount', '";
    $output .= (DEV_MODE === true ? $uat : $prod);
    $output .= "']);";
    $output .= "_gaq.push(['_trackPageview']);";
    $output .= "</script>";

    $this->values['google_tracking'] = $output;

  }

  public function we_are_hiring() {

    $forhire  = '<!--';
    $forhire .= '-->';

    $this->values['we_are_hiring'] = $forhire;

  }

  public function god_mode() {

    $this->values['godmode']    = DEV_MODE   === true ? '<script>window.developerMode  = true;</script>' : '';
    $this->values['production'] = PRODUCTION === true ? '<script>window.productionMode = true;</script>' : '';

  }

  public function set_ip_address($ip) {

    $this->values['ip'] = '<script>window.ip = "'.$ip.'"; alert(window.ip);</script>';

  }

  public function _include($template) {

    global $include_response;
    $file = $template.'.html.tp';

    if(file_exists(TEMPLATES_PATH.$file)) {

      $contents = file_get_contents(TEMPLATES_PATH.$file);
      $this->values['include:'.$template] = $contents;
      $output = $template.' loaded successfully';

    }else{

      $output = 'failed to include template';

    }

  }

  public function build_page() {

    global $build_response;

    if(file_exists(TEMPLATES_PATH.$this->file)) {

      $_output = file_get_contents(TEMPLATES_PATH.$this->file);

      foreach($this->values as $_key => $_value) {

        $_replace = '{{'.$_key.'}}';
        $_output = str_replace($_replace, $_value, $_output);

      }

      echo $_output;

    }

  }

}
