<?php

/**
  * @function load_javascript($file)
  * Load Javascript files into the page.
  * Determine if it's an internal script or
  * an external script. If the script is not
  * definied as internal or external, assume
  * it's internal.
  *
  */

function encrypt_string($string) {

}

/**
  * @function load_javascript($file)
  * Load Javascript files into the page.
  * Determine if it's an internal script or
  * an external script. If the script is not
  * definied as internal or external, assume
  * it's internal.
  *
  */

function limit_string_chars($string, $limit) {

  if(strlen($string) <= $limit) {

    return $string;

  }else{

    $trunc = substr($string, 0, $limit).'...';

    return $trunc;

  }

}

function client_ip_address() {

  $ipaddress = '';

  if (getenv('HTTP_CLIENT_IP'))
      $ipaddress = getenv('HTTP_CLIENT_IP');
  else if(getenv('HTTP_X_FORWARDED_FOR'))
      $ipaddress = getenv('HTTP_X_FORWARDED_FOR');
  else if(getenv('HTTP_X_FORWARDED'))
      $ipaddress = getenv('HTTP_X_FORWARDED');
  else if(getenv('HTTP_FORWARDED_FOR'))
      $ipaddress = getenv('HTTP_FORWARDED_FOR');
  else if(getenv('HTTP_FORWARDED'))
     $ipaddress = getenv('HTTP_FORWARDED');
  else if(getenv('REMOTE_ADDR'))
      $ipaddress = getenv('REMOTE_ADDR');
  else
      $ipaddress = 'UNKNOWN';

  return $ipaddress;

}

/**
  * @function load_javascript($file)
  * Load Javascript files into the page.
  * Determine if it's an internal script or
  * an external script. If the script is not
  * definied as internal or external, assume
  * it's internal.
  *
  */

function log_event($type, $response, $title, $message) {

  $response = [
    'title'=>$title,
    'message'=>$message
  ];

  if(DEV_MODE === true) {

    if($type === 'error') {

      return "<script>printError('".$response['title']."','".$response['message']."');</script>";

    }else if($type === 'success') {

      return "<script>printSuccess('".$response['title']."','".$response['message']."');</script>";

    }else if($type === 'message') {

      return "<script>printMessage('".$response['title']."','".$response['message']."');</script>";

    }

  }else{

    if($type === 'error') {

      return "<script>console.error('".$response['title'].": ".$response['message']."');</script>";

    }else if($type === 'success') {

      return "<script>console.debug('".$response['title'].": ".$response['message']."');</script>";

    }else if($type === 'message') {

      return "<script>console.log('".$response['title'].": ".$response['message']."');</script>";

    }

  }

}

/**
  * @function load_javascript($file)
  * Load Javascript files into the page.
  * Determine if it's an internal script or
  * an external script. If the script is not
  * definied as internal or external, assume
  * it's internal.
  *
  */

function database_connection(

  $connect  = DATABASE_CONNECT,
  $hostname = DATABASE_HOST,
  $username = DATABASE_USERNAME,
  $password = DATABASE_PASSWORD,
  $database = DATABASE_TABLE) {

  if($connect === true) {

    global $db_response;

    $connection = mysqli_connect($hostname, $username, $password, $database);

    if(!$connection) {

      $response_message = 'There was a problem connecting to the database.\r\n';
      $response_message .= 'Make sure the connection is configured properly.\r\n\r\n';
      $response_message .= 'Hostname: '.$hostname.'\r\n';
      $response_message .= 'Database: '.$database.'\r\n';
      $response_message .= 'Username: '.$username.'\r\n';
      $response_message .= 'Password: '.$password;

      log_event('error', $db_response, 'Database connection error ('.mysqli_connect_errno().')', $response_message);

      return false;

      exit;

    }else{

      $response_message = 'Database connection has beeen established successfully.\r\n';

      log_event('success', $db_response, 'Database connection successful!', $response_message);

      return true;

    }
  }
}
