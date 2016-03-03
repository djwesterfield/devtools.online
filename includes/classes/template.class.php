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

    if(DEV_MODE === true) {

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

          // stylesheet loaded successfully
          if($data['log'] === true) {
            $output .= log_event('success', $css_response, '{{'.$file.'}} loaded successfully', $source.$file);
          }

          $output .= '<link rel="stylesheet" href="'.$source.$file.'">';

        }else{

          // stylesheet failed to load
          if($data['log'] === true) {
            $output .= log_event('error', $css_response, '{{'.$file.'}} failed to load', $source.$file);
          }

        }

      }

    }else{

      $file = 'lib.compiled.min.css';

      if(file_exists(STYLESHEETS_INTERNAL_ROOT.$file)) {

        // stylesheet loaded successfully
        $output .= log_event('success', $css_response, '{{'.$file.'}} loaded successfully', STYLESHEETS_INTERNAL.$file);

        $output .= '<link rel="stylesheet" href="'.STYLESHEETS_INTERNAL.$file.'">';


      }else{

        // stylesheet failed to load
        $output .= log_event('error', $css_response, '{{'.$file.'}} failed to load', STYLESHEETS_INTERNAL.$file);

      }

    }

    return $output;

  }

  public function load_js($files) {

    global $js_response;
    $output = '';

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

          // javascript file loaded successfully
          if($data['log'] === true) {
              $output .= log_event('success', $js_response, '{{'.$file.'}} loaded successfully', $source.$file);
          }

          $output .= $open;
          $output .= '<script src="'.$source.$file.'"></script>';
          $output .= $close;

        }else{

          // javascript file loaded successfully
          if($data['log'] === true) {
              $output .= log_event('success', $js_response, '{{'.$file.'}} loaded successfully', $source.$file);
          }

          $output .= '<script src="'.$source.$file.'"></script>';

        }

      }else{

        // javascript file could not be found
        if($data['log'] === true) {
          $output .= log_event('error', $js_response, '{{'.$file.'}} failed to load', $source.$file);
        }

      }

    }

    return $output;

  }

  public function set_url($url) {
    $this->values['url'] = $url;
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

    $this->values['godmode'] = DEV_MODE === true ? '<script>window.developerMode = true;</script>' : '';

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
