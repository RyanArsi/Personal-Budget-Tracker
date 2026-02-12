<?php

namespace App;

class Model {
    public $string;
    
    public function __construct() {
        $this->string = "php and mvc is awesome";
    }
    
    public function getData() {
        return $this->string;
    }
}
