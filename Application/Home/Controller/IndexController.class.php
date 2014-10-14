<?php
namespace Home\Controller;
use Think\Controller;
use \LaneWeChat\Userinfo;
class IndexController extends Controller {
    public function index(){

    	$Match = M('Match');
		$num=1;
		$data=$Match->where('id=1')->find();
		if($data==null){
			$data['id'] = 1;
			$data['num'] = $num;
			$Match->data($data)->add();
		}else{
			$num=$data['num']+1;

			$data['num']=$num;
			$Match->save($data);
		}
    	$key=$num.time().rand(10,99);
    	// $key=302390923;
    	$isSender=1;
    	if(isset($_GET['from_key'])){
    		
    		// $key_data=$Match->where('`key`='.$_GET['from_key'])->find();
    		// if($key_data!=null){
    			$key=$_GET['from_key'];
                $isSender=0;
                $c_key=cookie('key');
                $is=0;
                if(stripos($c_key, '-'.$key.'-')!==false){
                   $is=1;
                }
                $this->assign('key',$key);
                $this->assign('isSender',$isSender);
                $key_data=$Match->where('`key`="'.$key.'"')->find();
                $isWork=1;
                if(!$key_data){
                    $isWork=0;
                }
                $isMatched=$key_data['ismatch']?$key_data['ismatch']:0;
                $this->assign('isMatched',$isMatched);

                $isTimeout=0;
                if($key_data['starttime']){
                    $isTimeout=(time()-$key_data['starttime']>180)?1:0;
                }
                if((time()-$key_data['time']>360)){
                    $isTimeout=1;
                }
                
                $this->assign('isTimeout',$isTimeout);
                $this->assign('isWork',$isWork);
                $this->display("helper");
    		// }
    	}else{
           
            $this->assign('key',$key);
            $this->assign('isSender',$isSender);
            $c_key=cookie('key');
            cookie('key',$c_key.'-'.$key.'-');
            // $this->handleCookie($key);
            $this->display();
        }
        

		


        
    }

    private function handleCookie($key){
        $c_key=cookie('key');
        if(stripos($c_key, '-'.$key.'-')===false){
            cookie('key',$c_key.'-'.$key.'-');
        }else{

        }
        
    }
}