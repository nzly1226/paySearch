<template>
  <div class="hello">  
    <myCanvas style="background-color:#fafafaf;"></myCanvas>
    <div class="login">
      <div class="bodys">
        <div class="top">
          <h3 class="h3">市政公用新能源支付查询系统</h3>
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
          <el-input placeholder="请输入账号/手机号" v-model="userName" clearable>
            <template slot="prepend">
              <i class="iconfont icon-yonghuming" style="font-size:16;"></i>
            </template>
          </el-input>
        </div>
        <div class="password">
          <el-input type="password" placeholder="请输入密码" v-model="password" clearable>
            <template slot="prepend">
              <i class="iconfont icon-keyboard_icon" style="font-size:16;"></i>
            </template>
          </el-input>
        </div>
        <div class="img">
          <el-input placeholder="验证码" v-model="imgs" clearable>
            <i slot="prepend" class="iconfont icon-im_yanzhengma" style="font-size:16;"></i>
            <template slot="append">
              <img @click="imgUS()" :src="urlImg" style="height: 24px;width:80px;" />
            </template>
          </el-input>
        </div>
        <div class="button">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-button type="primary" @click.native="loginS(types,userName,password,imgs)">登 录</el-button>
            </el-col>
            <el-col :span="12">
              <el-button  @click.native="updateS()">忘记密码</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myCanvas from 'vue-atom-canvas'
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'HelloWorld',
  data () {
    return {
      userName:"",
      password:"",
      imgs:"",
      types:"",
      type:[
        {id:'0',name:"个人用户",type:"0"},
        {id:'1',name:"企业用户",type:"1"},
        {id:'2',name:"合作伙伴",type:"2"},
      ],
      users:{
        userName:"admin",
        password:"123456"
      },
      urlImg:"static/img/login-code.png"
    }
  },
  components:{
    myCanvas
  },
  created(){
    this.ready();
  },
 methods:{
  ready(){
    //console.log(this.baseURL);
    localStorage.removeItem("loginUser");
    //var url = this.HOME + "/charging/api/user/getValidateCode";
    axios.post(this.baseURL+'/api/user/getValidateCode',{timeout:35000})
    .then(re =>{
      //console.log(re);
      var success = re.data.success;
      var message = re.data.message;
      if(success==1){
        var a = re.data.data.validateCode;
        var url = urlS(a,this.baseURL);
        //console.log(url);
        this.urlImg = url;
        //message.success(message);
      }
      else{
        this.$message.error(message);
        return false;
      }
    }).catch(err =>{
      this.$message.error("请求超时或内部错误，请稍后重试！");
      //console.log(err);
    })
    function urlS(item,url){
      var a = item.replace("https://pay.szgyxny.com/charging",url);
      //console.log(a);
      return a;
    }
  },
  imgUS(){
    var a = this.urlImg;
    //console.log(a);
    if(a!=null&&a!=""){
      if(a=="static/img/login-code.png"){
        a="";
      }
      var data = {
        validateCodeURL:a
      }
      var datas = JSON.stringify(data);
      axios.post(this.baseURL+'/api/user/getValidateCode',qs.stringify(data),{timeout:35000})
      .then(re =>{
        //console.log(re);
        var success = re.data.success;
        var message = re.data.message;
        if(success==1){
          var a = re.data.data.validateCode;
          var url = urlS(a,this.baseURL);
          //console.log(url);
          this.urlImg = url;
          //message.success(message);
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
  updateS(){
    this.$router.push({path:"/updatePWD"});
  },
  loginS(types,user,pwd,imgs){
    localStorage.clear();
    //console.log(user,pwd,imgs);
    if(types!=null&&types!=""){
      if(user!=null&&pwd!=null&&user!=""&&pwd!=""){
          //this.$message.success("提示：登录成功！");
        if(imgs!=""&&imgs!=null){
          var password = "";
          if(types == "个人用户"){
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
            loginName:user,
            password:password,
            validateCode:imgs,
            validateCodeURL:this.urlImg
          }
          //console.log(b);
          this.$axios.post(this.baseURL+"/f/user/login",this.$qs.stringify(b),{timeout:35000}).then(re =>{
            console.log(re);
            var success = re.data.success;
            var message =re.data.message;
            var data = re.data.data;
            if(success==1){
              //alert(data.userKey);
              localStorage.setItem("user",JSON.stringify(data));
              this.$message.success(message);
              console.log(types);
              if(types=="合作伙伴"){
                this.$router.push({path:"/partner"});
              }
              else{
                this.$router.push({path:"/first"});
              }
              
            }
            else{
              this.$message.error(message);
              return false;
            }
          }).catch(err =>{
            this.$message.error("内部错误！");
            console.log(err);
            return false;
          })
        }
        else{
          this.$message.warning("提示：请输入验证码！");
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
