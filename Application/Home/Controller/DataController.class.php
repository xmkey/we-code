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
			$data['time']=time();
			$Match->data($data)->add();
			$ret['status']='new';
		}else{

			$ret['status']='fail';

			if($key_data['ismatch']==1&&$key_data['num']>=3){
				$ret['status']='matched';
				// return false;
			}
			else if($data['timer']==0||time()-$key_data['time']>180){
				$ret['status']='timeout';
				// return false;
			}
			else if($key_data['to']==3&&$data['from']==3){
				$data['ismatch']=1;
				$data['num']=1;
				if($key_data['num']==2||$key_data['num']==3){
					$data['num']=3;
				}
				
				// $data['num']=($key_data['num']?$key_data['num']:0)+1;

				$ret['status']='success';
			}
			$ret['to']=$key_data['to'];
			
			// if($key_data['ismatch']!=1){
				
	    		$Match->where('`key`="'.$data['key'].'"')->save($data);
	    	// }
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
			
			if($key_data['ismatch']==1&&$key_data['num']>=3){
				$ret['status']='matched';
			}
			else if($key_data['timer']==0||time()-$key_data['time']>180){
				$ret['status']='timeout';
			}
			else if($key_data['from']==3&&$data['to']==3){
				$data['ismatch']=1;
				// $data['num']=($key_data['num']?$key_data['num']:0)+1;

				$data['num']=2;
				if($key_data['num']==1||$key_data['num']==3){
					$data['num']=3;
				}
				
				$ret['status']='success';
			}
			$ret['from']=$key_data['from'];
			$timer=180-(time()-$key_data['time']);
			if($timer<=0){
				$timer==0;
			}
			$ret['timer']=$timer;
			if($key_data['ismatch']==1){
				$data['to']=3;
			}
			$ret['num']=$data['num'];
	    	// if($key_data['ismatch']!=1){
	    		$Match->where('`key`="'.$data['key'].'"')->save($data);
	    	// }
		}
		echo json_encode($ret);
    }
    
    
}