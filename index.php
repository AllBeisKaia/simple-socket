<?php

include_once(__DIR__ . '/vendor/autoload.php');

use Workerman\Worker;

$wsWorker = new Worker('websocket://0.0.0.0:5000');

$wsWorker->count = 5;

$wsWorker->onConnect = function($connection) {
    echo "new Connection \n";
};

$wsWorker->onMessage = function($connection, $data) use ($wsWorker) {
    foreach($wsWorker->connections as $client){
        $client->send($data);
    }
};

$wsWorker->onClose = function($connection) {
    echo "Connection closed \n";
};

Worker::runAll();
