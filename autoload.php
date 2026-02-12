<?php

/**
 * Autoloader simples para as classes da aplicação
 */
spl_autoload_register(function ($class) {
    $prefix = 'App\\';
    
    if (strpos($class, $prefix) !== 0) {
        return;
    }
    
    $relative_class = substr($class, strlen($prefix));
    $file = __DIR__ . '/app/' . str_replace('\\', '/', $relative_class) . '.php';
    
    if (file_exists($file)) {
        require $file;
    }
});
