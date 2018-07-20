<?php
    /**
     * file routes
     * @author ritesh.patel
     */
    date_default_timezone_set('EST');
    $app->products = array();

    /**
     * GET route 
     * lists uploaded products
     */
    $app->get('/products', function ($request, $response, $args) use($app) {
        $product_file =  __DIR__ . '/../uploads/products.json';
        $handle = fopen($product_file, 'r');

        // check if file has data
        if (filesize($product_file) > 0) {
            // read data
            $products = fread($handle, filesize($product_file));
            $products = json_decode($products);
        } else {
            // log error message
            $this->logger->info('No products found');

            // fail gracefully
            $products = array('status' => 'failure', 'error' => 'No products found');
        }
        
        $newResponse = $response->withJson($products, 201, JSON_UNESCAPED_UNICODE);
        return $newResponse;
    });

    /**
     * POST route 
     * uploads a file to server
     */
    $app->post('/payload', function ($request, $response, $args) use($app) {
        $product_file =  __DIR__ . '/../uploads/products.json';

        // check if file has data in it, if so proceed else fail gracefully
        if (isset($_FILES['csvfile']) && $_FILES['csvfile']['size'] > 0) {
            $file_contents = file_get_contents($_FILES['csvfile']['tmp_name']);
            $arr = array_map('str_getcsv', explode("\n", $file_contents));

            // remove json file (if exist)
            if (is_file($product_file)) {
                unlink($product_file);
            }

            // write new file contents to server 
            $handle = fopen($product_file, 'w') or die('Cannot open file: products.json');
            fwrite($handle, json_encode($arr));
            echo json_encode($arr);

        } else {
            $msg = 'File is empty, please check file contents';
            
            // log error message
            $this->logger->info($msg);
            
            // fail gracefully
            $msg = array('status' => 'failure', 'error' => $msg);
            echo json_encode($msg);
        }
    });

?>