<template>
  <div class="hello">  
    <myCanvas style="background-color:#fafafaf;"></myCanvas>
    <div class="logins">
      <div class="bodys">
        <div class="top">
          <h3 class="h3">忘记密码</h3>
        </div>
        <div class="type">
          <el-input placeholder="请选择用户类型" v-model="types" :readonly="true">
            <i slot="prepend" class="iconfont icon-xuanzeleixing" style="font-size:16;"></i>
            <template slot="append">
              <el-select value-key="id" v-model="types" placeholder="类型">
                <el-option v-for="ty in type" :id="ty.id" :label="ty.name" :value="ty.name"></el-option>
              </el-select>
            </template>
          </el-input>
        </div>
        <div class="userName">
          <el-input placeholder="请输入手机号" v-model="userName" clearable>
            <template slot="prepend">
              <i class="iconfont icon-yonghuming" style="font-size:16;"></i>
            </template>
          </el-input>
        </div>
        <div class="password">
          <el-input type="password" placeholder="请输入新密码" v-model="password" clearable>
            <template slot="prepend">
              <i class="iconfont icon-keyboard_icon" style="font-size:16;"></i>
            </template>
          </el-input>
        </div>
        <div class="imgs">
          <el-input placeholder="验证码" v-model="imgs" clearable>
            <i slot="prepend" class="iconfont icon-im_yanzhengma" style="font-size:16;"></i>
            <template slot="append">
              <img @click="imgUS()" :src="urlImg" style="height: 24px;width:80px;" />
            </template>
          </el-input>
        </div>
        <div class="mobile">
        	<el-input placeholder="手机验证码" v-model="models" clearable>
        		<i slot="prepend" class="iconfont icon-phone" style="font-size:16;"></i>
        		<template slot="append">
	              	<el-button class="button" @click="countDown" :disabled="clickBtn">
					 	{{content}}
					</el-button>
	            </template>
        	</el-input>
        </div>
        <div class="button">
          <el-row :gutter="20">
          	<el-col :span="12">
          		<el-button type="primary" @click.native="loginS(types,userName,password,imgs)">确 认</el-button>
          	</el-col>
          	<el-col :span="12">
          		<el-button @click.native="back()">返 回</el-button>
          	</el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myCanvas from 'vue-atom-canvas'
export default {
  name: 'updatePWD',
  data () {
    return {
      userName:"",
      password:"",
      imgs:"",
      types:"",
      models:"",
      type:[
        {id:'0',name:"个人用户",type:"0"},
        {id:'1',name:"企业用户",type:"1"},
        {id:"2",name:"合作伙伴",type:"2"},
      ],
      users:{
        userName:"admin",
        password:"123456"
      },
      urlImg:"static/img/login-code.png",
      second:"获取",
      content: '获取',  // 按钮里显示的内容
      totalTime: 60 ,     //记录具体倒计时时间
	  clickBtn:false
    }
  },
  components:{
    myCanvas
  },
  created(){
    this.ready();
  },
 methods:{
 	countDown () {
	 	//console.log(1);
		var type = this.types;
	  	var userName = this.userName;
	  	var password = this.password;
	  	var imgs = this.imgs;

	  	if(more(type,userName,password,imgs)==true){
	  		var a = {
	  			type:typeS(type,this.type),
	  			mobile:userName,
	  			validateCode:imgs,
	  			validateCodeURL:this.urlImg,
	  			deviceCode:"12345"
	  		}
	  		this.content = this.totalTime + 's' //这里解决60秒不见了的问题
			this.clickBtn = true;
	  		let clock = window.setInterval(() => {
			  this.totalTime--
			  this.content = this.totalTime + 's'
			  if (this.totalTime < 0) {     //当倒计时小于0时清除定时器
			    window.clearInterval(clock)
			    this.content = '获取'
			    this.totalTime = 60
			    this.clickBtn = false
			    }
			 },1000);
	  		this.$axios.post(this.baseURL+'/api/user/getVerificationCode',this.$qs.stringify(a),{timeout:35000})
		    .then(re =>{
		      //console.log(re);
		      var success = re.data.success;
		      var message = re.data.message;
		      if(success==1){
		      	this.$message.success(message);
		      }else{
		      	this.$message.error(message);
		      	return false;
		      }
		    }).catch(err =>{
          this.$message.error("请求超时或内部错误，请稍后重试！");
		      //console.log(err);
		    })
			
	  	}
	  	else{
	  		this.$message.warning("提示：请依次将用户类型、手机号、新密码以及图形验证填写完毕！");
	        return false;
	  	}
	  	function more(a,b,c,d){
	  		if(a!=""&&b!=""&&c!=""&&d!=""&&a!=null&&b!=null&&c!=null&&d!=null){
	  			return true;
	  		}
	  		else{
	  			return false;
	  		}
	  	}
	  	function typeS(item,some){
	      var a = "";
	      for(var i=0;i<some.length;i++){
	        if(some[i].name == item){
	          a = some[i].type;
	        }
	      }
	      return a;
	    }
		
  },
  ready(){
  	var a = this.urlImg;
  	//console.log(a);
  	if(a!="static/img/login-code.png"&&a!=null&&a!=""){
  		var data = {
  			validateCodeURL:a
  		}
  		var datas = JSON.stringify(data);
  		this.$axios.post(this.baseURL+'/api/user/getValidateCode',datas,{timeout:35000})
	    .then(re =>{
	      //console.log(re);
	      var success = re.data.success;
	      var message = re.data.message;
	      if(success==1){
	        var a = re.data.data.validateCode;
	        var url = urlS(a);
	        //console.log(url);
	        this.urlImg = url;
	        //this.$message.success(message);
	      }
	      else{
	        this.$message.error(message);
	        return false;
	      }
	    }).catch(err =>{
        this.$message.error("请求超时或内部错误，请稍后重试！");
	      //console.log(err);
	    })
  	}
    else{
      this.$axios.post(this.baseURL+'/api/user/getValidateCode',{timeout:35000})
      .then(re =>{
        //console.log(re);
        var success = re.data.success;
        var message = re.data.message;
        if(success==1){
          var a = re.data.data.validateCode;
          var url = urlS(a,this.baseURL);
          //console.log(url);
          this.urlImg = url;
          //this.$message.success(message);
        }
        else{
          this.$message.error(message);
          return false;
        }
      }).catch(err =>{
        this.$message.error("请求超时或内部错误，请稍后重试！");
        //console.log(err);
      })
    }
    function urlS(item,url){
      var a = item.replace("https://pay.szgyxny.com/charging",url);
      //console.log(a);
      return a;
    }
  },
  back(){
  	this.$router.push({path:'/'});
  },
  imgUS(){
  	var a = this.urlImg;
  	//console.log(a);
  	if(a!=null&&a!=""){
  		var data = {
  			validateCodeURL:a
  		}
  		var datas = JSON.stringify(data);
  		this.$axios.post(this.baseURL+'/api/user/getValidateCode',this.$qs.stringify(data),{timeout:35000})
	    .then(re =>{
	      //console.log(re);
	      var success = re.data.success;
	      var message = re.data.message;
	      if(success==1){
	        var a = re.data.data.validateCode;
	        var url = urlS(a,this.baseURL);
	        //console.log(url);
	        this.urlImg = url;
	        //this.$message.success(message);
	      }
	      else{
	        this.$message.error(message);
	        return false;
	      }
	    }).catch(err =>{
        this.$message.error("请求超时或内部错误，请稍后重试！");
	      //console.log(err);
	    })
  	}
  	function urlS(item,url){
      var a = item.replace("https://pay.szgyxny.com/charging",url);
      //console.log(a);
      return a;
    }
  },
  loginS(types,user,pwd,imgs){
    //console.log(user,pwd,imgs);
    var mobile = this.models;
    if(types!=null&&types!=""){
      if(user!=null&&pwd!=null&&user!=""&&pwd!=""){
          //this.$message.success("提示：登录成功！");
        if(mobile!=null&&mobile!=""){
          var password = "";
          if(types=="个人用户"){
            password = hex_sha1(pwd);
          }
          else{
            password = pwd;
          }
          var a = {
            types:types,
            userName:user,
            pwd:pwd,
          }
          localStorage.setItem("loginUser",JSON.stringify(a));
          var b = {
            type:typeS(types,this.type),
            mobile:user,
            password:password,
            verificationCode:mobile
          }
          var c = JSON.stringify(b);
          //console.log(c);
          this.$axios.post(this.baseURL+"/f/user/updatePassword",this.$qs.stringify(b),{timeout:35000}).then(re =>{
            //console.log(re);
            var success = re.data.success;
            var message = re.data.message;
            if(success==1){
              this.$message.success(message);
              this.$router.push({path:"/"});
            }
            else{
              this.$message.error(message);
              return false;
            }

          }).catch(err =>{
            this.$message.error("请求超时或内部错误，请稍后重试！");
            //console.log(err);
          })
        }
        else{
          this.$message.warning("提示：请输入手机验证码！");
          return false;
        }  
          //
          //this.$router.push({path:"/first"});
          //this.$message.success("提示：登录成功！");
          
      }
      else{
        this.$message.warning("提示：请输入用户及密码！");
        return false;
      }
    }
    else{
      this.$message.warning("提示：请选择用户类型！");
        return false;
    }
    function typeS(item,some){
      var a = "";
      for(var i=0;i<some.length;i++){
        if(some[i].name == item){
          a = some[i].type;
        }
      }
      return a;
    }
  }
 }
}
</script>

<style>
	
</style>