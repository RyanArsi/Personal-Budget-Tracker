<?php  
    class View {
        private $controler;
        private $model;
        public function __construct($controler, $model) {
            $this->controler = $controler;
            $this->model = $model;
        }
        public function output() {
            echo $this->model->string;
        }

    }