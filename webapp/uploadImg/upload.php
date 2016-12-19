<?php
	include './qiniu/php-sdk/autoload.php';
	// 需要填写你的 Access Key 和 Secret Key
    $accessKey = 'uibg5p69iq9VUrPZDrTbf_GE2e5kn3WGra6l46xV';
    $secretKey = 'Wayzi1DFQtPmm7zFk1Yb15Qq_VJjNEM12mpU9B8Z';

    // 构建鉴权对象
    $auth = new \Qiniu\Auth($accessKey, $secretKey);

    // 要上传的空间
    $bucket = 'upload';
    // 上传文件到七牛后， 七牛将文件名和文件大小回调给业务服务器

    // 生成上传 Token
    $token = $auth->uploadToken($bucket);

    // 上传到七牛后保存的文件名
    $key = time() . rand(1000, 9999) . '.png';

    // 初始化 UploadManager 对象并进行文件的上传
    $uploadMgr = new \Qiniu\Storage\UploadManager();

    // 上传文件到七牛
    $filePath = $_POST['baseimg'];
//        echo $_POST['baseimg'];

    list($ret, $err) = $uploadMgr->putFile($token, $key, $filePath);

    echo  "http://img1.2jyl.com/" . $ret['key'];