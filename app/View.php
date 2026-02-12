<?php

namespace App;

class View {
    private $controller;
    
    public function __construct(Controller $controller) {
        $this->controller = $controller;
    }
    
    public function render() {
        $data = $this->controller->getData();
        echo $data;
    }
    
    public function output() {
        $this->render();
    }
}
