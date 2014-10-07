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
    	$isSender=true;

    	if(isset($_GET['from_key'])){
    		
    		// $key_data=$Match->where('`key`='.$_GET['from_key'])->find();
    		// if($key_data!=null){
    			$key=$_GET['from_key'];
    			$isSender=0;

    		// }
    	}	

		$this->assign('key',$key);
		$this->assign('isSender',$isSender);


        $this->display();
    }

    
}