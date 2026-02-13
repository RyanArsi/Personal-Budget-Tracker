<?php

namespace App;

class View {
    private $controller;
    private $layoutPath;
    
    public function __construct(Controller $controller) {
        $this->controller = $controller;
        $this->layoutPath = __DIR__ . '/../web/layout.php';
    }
    
    public function render() {
        $data = $this->controller->getData();
        
        // Incluir o layout com os dados
        ob_start();
        include $this->layoutPath;
        $content = ob_get_clean();
        
        echo $content;
    }
    
    public function output() {
        $this->render();
    }
}
