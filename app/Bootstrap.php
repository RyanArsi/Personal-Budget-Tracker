<?php

namespace App;

class Bootstrap {
    private $model;
    private $controller;
    private $view;
    
    public function __construct() {
        $this->model = new Model();
        $this->controller = new Controller($this->model);
        $this->view = new View($this->controller);
    }
    
    public function run() {
        $this->view->output();
    }
    
    public function getModel() {
        return $this->model;
    }
    
    public function getController() {
        return $this->controller;
    }
    
    public function getView() {
        return $this->view;
    }
}
