<?php
namespace LaneWeChat;

use LaneWeChat\Core\WeChatOAuth;
/**
 * Description: 获取CODE
 * @param $scope snsapi_base不弹出授权页面，只能获得OpenId;snsapi_userinfo弹出授权页面，可以获得所有信息
 * 将会跳转到redirect_uri/?code=CODE&state=STATE 通过GET方式获取code和state
 */
include_once 'config.php';
$param="?";
$urlparam=json_decode($_COOKIE['urlparam']);
foreach ($urlparam as $key => $value) {
    $param.=$key."=".$value."&";
}

$code = $_GET['code'];
setcookie("code",$code, time()+3600*5);
header('Location: index.php'.$param);
?>