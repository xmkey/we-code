<?php
namespace Home\Controller;
use Think\Controller;

class DataController extends Controller {
	public $limit;
    public function index(){
    	$postdata=I('post.');
    	$this->limit=300;
    	if($postdata['isSender']){
    		$this->_senderHandle($postdata);
    	}else{
    		$this->_helperHander($postdata);
    	}
    	// echo 1;
    }
    private function _senderHandle($postdata){
    	$ret=array();
    	$limit=$this->limit;
    	$data['key'] =$postdata['key'];
		$data['from'] = $postdata['status'];
		$data['timer'] = $postdata['timer'];
		// $data['time'] = 133;
		
		// $data['isMatch']=false;
    	$Match = M('Match');
    	$key_data=$Match->where('`key`="'.$data['key'].'"')->find();
    	if($postdata['status']=="reget"){
    		
    		$CodeTable = M('Code');
			$codeData = $CodeTable->where('used=0 and id>10000')->order('id')->find();

			$codeUsed['used']=1;

			$CodeTable->where('id='.$codeData['id'])->save($codeUsed); 
			$data['code']=$codeData['id'];
			$ret['code']=$codeData['code'];
			
			$ret['status']='success';
    	}
		else if(!$key_data){
			$data['time']=time();
			$Match->data($data)->add();
			$ret['status']='new';
		}else{

			$ret['status']='fail';

			if($key_data['ismatch']==1&&$key_data['num']>=3){
				$ret['status']='matched';
				// return false;
			}
			else if($key_data['timer']==0||(time()-$key_data['time']>$limit)){
				$ret['status']='timeout';
				// return false;
			}
			// else if($data['timer']==0||($key_data['starttime']&&time()-$key_data['starttime']>180)||(time()-$key_data['time']>360)){
			// 	$ret['status']='timeout';
			// 	// return false;
			// }
			else if($key_data['to']==3&&$data['from']==3){
				$data['ismatch']=1;
				$data['num']=1;
				if($key_data['num']==2||$key_data['num']==3){
					$data['num']=3;
				}
				// $code = uniqid();
				// $id=$key_data['id'];
				// $id1=$id%10;
				// $id=(int)($id/10);
				// $id2=$id%10;
				// $code=$id1.$id2.substr($code,2);
				// $code =strtoupper($code);
				// $data['code']=$code;
				// $ret['code']=$code;
				// $data['num']=($key_data['num']?$key_data['num']:0)+1;

				$CodeTable = M('Code');
				$codeData = $CodeTable->where('used=0 and id>10000')->order('id')->find();

				$codeUsed['used']=1;

				$CodeTable->where('id='.$codeData['id'])->save($codeUsed); 
				$data['code']=$codeData['id'];
				$ret['code']=$codeData['code'];
				$ret['status']='success';
			}
			// if($data['timer']!=180&&!$key_data['starttime']){
			// 	$data['starttime']=time();
			// }
			$ret['to']=$key_data['to'];
			
			// if($key_data['ismatch']!=1){
			
	    	$Match->where('`key`="'.$data['key'].'"')->save($data);
	    	// }
		}
		echo json_encode($ret);
    }
    private function _helperHander($postdata){

    	$ret=array();
    	$limit=$this->limit;
    	$data['key'] =$postdata['key'];
		$data['to'] = $postdata['status'];

		// $data['ismatch']=false;
    	$Match = M('Match');

    	$key_data=$Match->where('`key`="'.$data['key'].'"')->find();
		if(!$key_data){
			$ret['status']='noyet';

		}else{
			$ret['status']='fail';
			// echo $key_data['timer'];
			if($key_data['ismatch']==1&&$key_data['num']>=3){
				$ret['status']='matched';
			}
			else if($key_data['timer']==0||(time()-$key_data['time']>$limit)){
				$ret['status']='timeout';
			}

			// print_r(time()-$key_data['time']);
			// else if($key_data['timer']==0||($key_data['starttime']&&time()-$key_data['starttime']>180)||(time()-$key_data['time']>360)){
			// 	$ret['status']='timeout';
			// }
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
			// $timer=$key_data['timer'];
			// if($key_data['starttime']){
			// 	$timer=(180-(time()-$key_data['starttime']));
			// }
			// if($key_data['starttime']&&abs((180-(time()-$key_data['starttime']))-$key_data['timer'])>5){
			// 	$timer=(180-(time()-$key_data['starttime']));
			// }
			$timer=$limit-(time()-$key_data['time']);
			
			// $key_data['timer']==180?180:(180-(time()-$key_data['time']));
			if($timer<=0){
				$timer=0;
			}
			// echo $timer<=0;
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