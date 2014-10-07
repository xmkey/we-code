<?php
namespace Home\Controller;
use Think\Controller;

class DataController extends Controller {
    public function index(){
    	$postdata=I('post.');
    	if($postdata['isSender']){
    		$this->_senderHandle($postdata);
    	}else{
    		$this->_helperHander($postdata);
    	}
    }
    private function _senderHandle($postdata){
    	$ret=array();

    	$data['key'] =$postdata['key'];
		$data['from'] = $postdata['status'];
		$data['timer'] = $postdata['timer'];
		// $data['time'] = 133;

		// $data['isMatch']=false;
    	$Match = M('Match');
    	$key_data=$Match->where('`key`="'.$data['key'].'"')->find();
    	
		if(!$key_data){
			$Match->data($data)->add();
			$ret['status']='new';
		}else{

			$ret['status']='fail';
			if($key_data['ismatch']==1&&$key_data['num']>=2){
				$ret['status']='matched';
			}
			else if($data['timer']==0||time()-strtotime($key_data['time'])>60){
				$ret['status']='timeout';
			}
			else if($key_data['to']==3&&$data['from']==3){
				$data['ismatch']=1;
				$data['num']=$key_data['num']?$key_data['num']:0+1;
				$ret['status']='success';
			}
			$ret['to']=$key_data['to'];
			
	    	$Match->where('`key`="'.$data['key'].'"')->save($data);
		}
		echo json_encode($ret);
    }
    private function _helperHander($postdata){
    	$ret=array();
    	$data['key'] =$postdata['key'];
		$data['to'] = $postdata['status'];

		// $data['ismatch']=false;
    	$Match = M('Match');

    	$key_data=$Match->where('`key`="'.$data['key'].'"')->find();
		if(!$key_data){
			$ret['status']='noyet';
		}else{
			$ret['status']='fail';
			
			if($key_data['ismatch']==1&&$key_data['num']>=2){
				$ret['status']='matched';
			}
			else if($key_data['timer']==0||time()-strtotime($key_data['time'])>60){
				$ret['status']='timeout';
			}
			else if($key_data['from']==3&&$data['to']==3){
				$data['ismatch']=1;
				$data['num']=$key_data['num']?$key_data['num']:0+1;
				$ret['status']='success';
			}
			$ret['from']=$key_data['from'];
			$ret['timer']=$key_data['timer'];
			
	    	$Match->where('`key`="'.$data['key'].'"')->save($data);
		}
		echo json_encode($ret);
    }
    
    
}