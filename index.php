<?php

require __DIR__ . '/autoload.php';

use App\Bootstrap;

// Inicializar a aplicação
$app = new Bootstrap();
$app->run();