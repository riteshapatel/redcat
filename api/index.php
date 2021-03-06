<?php
/**
 * slim app 
 * @author ritesh.patel 
 *
 */
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;


require 'vendor/autoload.php';

// create app instance
$app = new \Slim\App;

// get dependency container
$container = $app->getContainer();

// configure logger
$container['logger'] = function ($c) {
    $settings = [
        // Path to log directory
        'directory' => __DIR__ . '/logs',
        // Log file name
        'filename' => 'api.log',
        // Your timezone
        'timezone' => 'US/Eastern',
        // Log level
        'level' => 'debug',
        // List of Monolog Handlers you wanna use
        'handlers' => [],
    ];

    return new \Projek\Slim\Monolog('slim-app', $settings);
};

// require routes
require 'routes/index.php';

$app->run();