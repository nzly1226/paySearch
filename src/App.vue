<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
body{
  background-color: #edf4fa;
}
.hello{
  height: auto;
  display: block;
}
vue-particles{
  position: fixed;
  top:0;
  left: 0;
  z-index: 1;
}
.login{
  width: 340px;
  height: 400px;
  margin: auto;
  margin-top:170px;
  -ms-flex-align: center;
    -ms-flex-direction: column;
    -ms-flex-pack: center;
    -webkit-box-align: center;
    -webkit-box-direction: normal;
    -webkit-box-orient: vertical;
    -webkit-box-pack: center;
    align-items: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.bodys{
    height: 100%;
    width: 100%;
    -webkit-box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);
    box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);
    background-color: #fff;
    border: 1px solid #ebeef5;
    color: #303133;
    transition: .3s;
}
.bodys .top{
  margin-top: 30px;
  margin-bottom: 10px;
}
.bodys .top .h3{
  line-height: 40px;
 font-size: 16px;
  text-align: center;
}
.type{
  margin-right:30px;
  margin-left:30px;
  margin-bottom: 20px;
}
.userName{
  margin-right:30px;
  margin-left:30px;
  margin-bottom: 20px;
}
.password{
  margin-right:30px;
  margin-left:30px;
  margin-bottom: 20px;
}
.img{
  margin-right:30px;
  margin-left:30px;
  margin-bottom: 30px;
}
.button{
  margin-left: 30px;
  margin-right: 30px;
}
.button button{
  width: 100%;
}
.logins{
    width: 340px;
    height: 470px;
    margin: auto;
    margin-top:150px;
    -ms-flex-align: center;
      -ms-flex-direction: column;
      -ms-flex-pack: center;
      -webkit-box-align: center;
      -webkit-box-direction: normal;
      -webkit-box-orient: vertical;
      -webkit-box-pack: center;
      align-items: center;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      flex-direction: column;
      justify-content: center;
  }
  .imgs{
    margin-right:30px;
    margin-left:30px;
    margin-bottom: 20px;
  }
  .mobile{
    margin-right:30px;
    margin-left:30px;
    margin-bottom: 30px;
  }
  .body{
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
  }
  .somes{
    position: relative;
      padding-top: 80px;
      width: 100%;
    display: block;
    zoom:1;
  }
  .mores{
    width: 935px;
    float:right;
  }
  .btn{
    width: 235px;
    height: 100%;
    background-color: #d7dee4;
    display: block;
    float:left;
    position: fixed;
    z-index:10;
  }
  .btn_ul{
    background-color: #d7dee4;
    width: 235px;
    height: 100%;
  }
  .btn_ul li{
    color:#777;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: #d7dee4;
    font-size: 14px;
    overflow: hidden;
  }
  .btn_ul li a{
    color:#777;
    width: 100%;
    height: 50px;
  }
  .btn_ul li *{
    float:left;
    margin-left: 20px;
  }
  .btn_ul li a:hover{
    color:#000;
  }
  .btn_ul li:hover{
    color:#000;
    background-color: #c3d7ff;
  }
  .btn_ul li.btn_btn{
    background-color: #dce8f3;
  }
  .el-row {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .el-col {
      border-radius: 10px;
      height: 100px;
    }
    .bg-purple {
      background: #fff;
    }
    .um_top{
      overflow: hidden;
    }
    .um_top i{
      float:left;
      margin-right: 20px;
      font-size: 20;
    }
    .um_top h3{
      float:left;
    }
    .um_top .buttons{
      float: right;
    }
  .um_top{
    margin-bottom: 10px;
  }
  .center_t{
    overflow: hidden;
    margin: 10px;
  }
  .center_t *{
    margin-top: 20px;
    float:left;
  }
  .center_t i{
    margin-left: 75px;
    margin-right: 20px;
  }
  .center_t h3{
    font-size: 20px;
  }
  .center_b{
    font-size: 14px;
    color: #999;
    line-height: 30px;
    padding-bottom: 10px;
    text-align: center;
  }
  .chargingM{
    margin-top: 20px;
    margin-bottom: 30px;
  }
  .userMore{
    margin-bottom: 40px;
  }
  .consumptionM{
    margin-bottom: 30px;
  }
  .text{
    margin-top: 20px;
    background-color: #fff;
    width:100%;
  }
  .text .text_top ul{
    margin:20px;
  }
  .text .text_top h4{
    margin-left: 20px;
    font-size: 14px;
    color: #666;
    line-height: 4sssss0px;
  }
  .el-checkbox{
    margin-right: 30px;
  }
  .el-checkbox+.el-checkbox{
    margin-left:0px;
  }
  .el-message{
    left: 54%;
    top:9%;
  }
  .el-radio+.el-radio{
    margin-left:0px;
  }
  .el-radio{
    margin-right:30px;
  }
  .um_top a:hover{
    text-decoration: underline;
  }
</style>

