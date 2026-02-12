<?php

namespace App;

class Controller {
    private $model;
    
    public function __construct(Model $model) {
        $this->model = $model;
    }
    
    public function getData() {
        return $this->model->getData();
    }
    
    public function getModel() {
        return $this->model;
    }
}
