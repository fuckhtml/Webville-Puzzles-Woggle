<?php

  $word = $_REQUEST['word'];

  require_once("dictionary.php");
  if (strpos( $dict, ' ' . $word . ' ' ) > -1) {

    $vowels = array('a', 'e', 'i', 'o', 'u');

    $score = 0;
    for ($i=0; $i<strlen($word); $i++) {
      if (in_array($word[$i], $vowels))
        $score += 1;
      else
        $score += 2;
    }

    echo $score;
    return;

  } else {

    echo "0";
    return;

  }

?>
