<?php
namespace Home\Controller;
use Think\Controller;

class ShowdataController extends Controller {
	
    public function index(){
    	$CodeTable = M('Code');
		$codeData = $CodeTable->where('id>10000')->order('id')->select();
		$this->assign("data",$codeData);
		$this->display("Index/code");
    }
    
    
    
}