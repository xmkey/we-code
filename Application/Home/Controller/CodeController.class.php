<?php
namespace Home\Controller;
use Think\Controller;

class CodeController extends Controller {
	
    public function index(){
    	
    	$list=array(9,3,1,8,2,11,10,7,4,12,0,5,6);
    	$Code = M('Code');
    	$data=array();
    	
    	for($i=1;$i<110000;$i++){
    		
    		$data['id']=$i;

	    	$uniq = str_split(uniqid());
	    	$uniqTmp=array();
	    	
	    	for($j=0;$j<count($list);$j++){
	    		
	    		$uniqTmp[$j]=$uniq[$list[$j]];
	    	}
	    	
	    	$thisCode=strtoupper(implode('',$uniqTmp));
	    	
	    	$data['code']=$thisCode;
	    	$data['used']=0;
	    	$Code->data($data)->add();
	    	// sleep(1);
    	}
    }
    
    
}