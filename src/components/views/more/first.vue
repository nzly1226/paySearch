<template>
	<div class="body">
		<v-top></v-top>
		<div class="somes">
			<div class="common_center">
				<div class="btn">
					<ul class="btn_ul">
						<li v-for="li in btns" @click="clickLi(li)" :class="li.isBtn">
							<router-link :to="li.to">
								<i v-if="li.icon != ''" class="iconfont" :class="li.icon" style="font-size: 16;"></i>
								<h4>{{li.name}}</h4>
							</router-link>
						</li>
					</ul>
				</div>
				<div class="mores">
					<div class="userMore">
						<div class="um_top">
							<i class="iconfonts" style="font-size:28px; color:#409EFF">&#xe7cb;</i>
							<h3 style="line-height:40px;font-size: 16px;">数据总览：</h3>
							<el-button class="buttons" type="primary" round @click="openWin">点击充值</el-button>
						</div>
						<el-row :gutter="20">
						  <el-col :span="8">
						  	<div class="grid-content bg-purple">
						  		<div class="center_t">
									<i class="iconfonts" style="font-size:20px; color:#a22aff">&#xe642;</i>
									<h3 style="margin-left:10px;">￥ {{consumptionS}}</h3>
								</div>
								<div class="center_b">
									<p>总消费金额</p>
								</div>
						    </div>
						  </el-col>
						  <el-col :span="8"><div class="grid-content bg-purple">
						  		<div class="center_t">
									<i class="iconfonts" style="font-size:20px; color:#08ee59">&#xe60b;</i>
									<h3 style="margin-left:10px;">￥ {{chargeS}}</h3>
								</div>
								<div class="center_b">
									<p>总充值金额</p>
								</div>
						  </div></el-col>
						  <el-col v-if="userType!=false" :span="8"><div class="grid-content bg-purple">
								<div class="center_t">
									<i class="iconfonts" style="font-size:20px; color:#fd14b3">&#xe658;</i>
									<h3 style="margin-left:10px;">{{countS}} 人</h3>
								</div>
								<div class="center_b">
									<p>总人数</p>
								</div>
						  </div></el-col>
						</el-row>
					</div>
					<div class="cardBalance">
						<div class="um_top">
							<h3 style="line-height:40px;font-size: 16px;">充值卡余额：</h3>
						</div>
						<el-table
							:data="cardB.filter(data => !searchMore || data.CodeOnCard.toLowerCase().includes(searchMore.toLowerCase()))"
							style="width:100%;"
							max-height="300"
							@row-dblclick="rowDblclick"
						>
							<el-table-column
					        
					        label="卡号">
					        	<template slot-scope="scope">
					        		<p :style="scope.row.style">{{scope.row.CodeOnCard}}</p>
					        	</template>
					      	</el-table-column>
					      	<el-table-column
					      	
							label="余额"
					      	>
					      		<template slot-scope="scope">
					        		<p :style="scope.row.style">{{scope.row.Balance}}</p>
					        	</template>
					      	</el-table-column>
					      	<el-table-column
							  align="right">
							  <template slot="header" slot-scope="scope">
							    <el-input
							      v-model="searchMore"
							      size="mini"
							      placeholder="输入卡号搜索"/>
							  </template>
							</el-table-column>
						</el-table>
					</div>
					<div class="chargingM">
						<div class="um_top">
							<h3 style="line-height:40px;font-size: 16px;">充值数据：</h3>
							<a style="float:right;line-height:40px;color:#409EFF;cursor:pointer;" @click="chargingIn()">更多详情</a>
						</div>
					  	<el-table
								:data="Chargings"
								style="width: 100%"
							>
								<el-table-column
						        prop="CardCode"
						        label="卡号"
						        width="150">
						      	</el-table-column>
						      	<el-table-column
						        prop="Amount"
						        label="金额"
						        width="100">
						      	</el-table-column>
						      	<el-table-column
								label="类型"
								width="150"
						      	>
						      		<template slot-scope="scope">
						      			<p v-if="scope.row.Type==1">现金充值</p>
						      			<p v-else-if="scope.row.Type ==3">支付宝充值</p>
						      			<p v-else-if="scope.row.Type ==4">微信充值</p>
						      			<p v-else-if="scope.row.Type ==5">交行转账</p>
						      			<p v-else-if="scope.row.Type ==6">建行转账</p>
						      			<p v-else-if="scope.row.Type ==7">优惠金额</p>
						      			<p v-else-if="scope.row.Type ==8">测试</p>
						      			<p v-else-if="scope.row.Type ==9">内部</p>
						      			<p v-else-if="scope.row.Type ==10">主-副</p>
						      			<p v-else-if="scope.row.Type ==11">副卡充值</p>
						      			<p v-else>暂无</p>
						      		</template>	
						      	</el-table-column>
						      	<el-table-column
								prop="Number"
								label="订单号"
								width="240"
						      	>
						      	</el-table-column>
						      	<el-table-column
						        label="时间">
						        	<template slot-scope="scope">
						        		<p>{{scope.row.CreatedWhen | formatDate}}</p>
						        	</template>
						      	</el-table-column>
					  		</el-table>
					</div>
					<div class="consumptionM">
						<div class="um_top">
							<h3 style="line-height:40px;font-size: 16px;">消费数据：</h3>
							<a style="float:right;line-height:40px;color:#409EFF;cursor:pointer;" @click="consumptionIn()">更多详情</a>
						</div>
						<el-table
								:data="Consumptions"
								style="width: 100%"
							>
								<el-table-column
						        prop="CardCode"
						        label="卡号"
						        width="120">
						      	</el-table-column>
						      	<el-table-column
						        prop="Amount"
						        label="消费金额"
						        width="80">
						      	</el-table-column>
						      	<el-table-column
						        prop="Degree"
						        label="充电电量"
						        width="80">
						      	</el-table-column>
						      	<el-table-column
								prop="Number"
								label="订单号"
								width="130"
						      	></el-table-column>
						      	<el-table-column
						        label="充电开始时间"
								width="160"
						        >
						        	<template slot-scope="scope">
						        		<p>{{scope.row.StartWhen | formatDate}}</p>
						        	</template>
						      	</el-table-column>
						      	<el-table-column
								label="充电结束时间"
								width="160"
						      	>
						      		<template slot-scope="scope">
						        		<p>{{scope.row.EndWhen | formatDate}}</p>
						        	</template>
						      	</el-table-column>
						      	<el-table-column
						      	prop="StationName"
								label="场站"
						      	>
						      	</el-table-column>
						  	</el-table>
					</div>
					
				</div>
			</div>
		</div>

		<el-dialog title="支付界面" width="600px" :visible.sync="dialogFormVisible" @close="closeWin">
		  <ul style="margin-top:-30px;">
		  	<li style="margin-bottom:20px;">
		  		<h3 style="line-height:40px;">选择充值方式：</h3>
				<el-radio-group v-model="chargingS.type">
					<el-radio :label="1" @click.native="zhuCardS(cardS,0)">支付宝充值</el-radio>
    				<el-radio :label="2" @click.native="zhuCardS(cardS,0)">微信充值</el-radio>
    				<el-radio v-if="userTypes=='企业用户'" :label="3" @click.native="zhuCardS(cardS,1)">主到副充值</el-radio>
    				<!-- <el-radio :label="3">银联充值</el-radio> -->
				</el-radio-group>
		  	</li>
		  	<li style="margin-bottom:20px;">
		  		<h3 style="line-height:40px;">充值金额（正整数）：</h3>
		  		<el-input onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" style="width:50%;" v-model="chargingS.balance" placeholder="请输入内容" value="number" clearable></el-input>
		  	</li>
		  	<li style="margin-bottom:20px;">
		  		<h3 style="line-height:40px;">选择卡号：</h3>
				<el-radio-group v-model="chargingS.cards">
					<el-radio v-for="card in cards" :label="card">{{card}}</el-radio>
				</el-radio-group>
		  	</li>
		  	
		  </ul>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="closeWin">取 消</el-button>
		    <el-button type="primary" @click="chargingMore(chargingS)">确 定</el-button>
		  </div>
		</el-dialog>
		<el-dialog title="支付确认" :center="true" width="400px" :visible.sync="weixin" @close="closeWin">
		  <ul style="margin-top:-20px;">
		  	<li>
		  		<h4 style="text-align:center;font-size:12px;line-height:20px;">卡号：{{chargingS.cards}}</h4>
		  		<h4 style="text-align:center;font-size:12px;line-height:20px;">金额：￥ {{chargingS.balance}}</h4>
		  		<div v-if="weixinM!=4">
		  			<img style="margin:auto;" width="180" height="180" :src="Bnurl"/>
		  		</div>
		  		<h4 v-if="weixinM!=4" style="text-align:center;font-size: 12px;margin-top:2%;">请使用微信扫描上方二维码进行支付</h4>
		  		<h4 v-if="weixinM!=4" style="text-align:center;font-size: 12px;margin-top:2%;color:red;">本二维码6分钟之内有效</h4>
		  		<h4 v-if="weixinM!=4" style="text-align:center;font-size: 12px;margin-top:2%;color:red;">请在6分钟之内完成扫码支付</h4>
		  		<h4 v-if="weixinM==4" style="text-align:center;font-size: 16px;margin-top:2%;color:red;">本二维码已失效，请返回重新充值！</h4>
		  	</li>
		  </ul>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="weixin = false">取 消</el-button>
		    <el-button type="primary" @click="closeWin">确 定</el-button>
		  </div>
		</el-dialog>
	</div>
</template>

<script>
	import top from '../common/header.vue'
	//import Btn from '../common/btn.vue'
	//import "v-top" from '../common/header.vue'
	import {formatDate} from '../../date.js'
	export default{
		name:"first",
		data(){
			return{
				btns:[
					{id:"0",name:"数据总览",icon:"icon-jiaoyizonglan",isBtn:"btn_btn",to:"/first"},
					{id:"1",name:"充值记录",icon:"icon-xiaofei01",isBtn:"",to:"/chargingR"},
					{id:"2",name:"消费记录",icon:"icon-chuanyuejilu",isBtn:"",to:"/consumptionR"},
					{id:"3",name:"挂失补办",icon:"icon-yishibuzheng",isBtn:"",to:"/lossCard"},
					{id:"4",name:"常见问题",icon:"icon-changjianwenti",isBtn:"",to:"/problems"},
				],
				cardB:[
				],
				userType:false,
				Chargings:[
				],
				Consumptions:[
				],
				chargeS:"",
				consumptionS:"",
				countS:"",
				dialogFormVisible: false,
		        form: {
		          name: '',
		          region: '',
		          date1: '',
		          date2: '',
		          delivery: false,
		          type: [],
		          resource: '',
		          desc: ''
		        },
		        formLabelWidth: '900px',
		        chargingS:{
		        	cards:"",
		        	balance:"",
		        	type:1
		        },
		        cards:[],
		        fromImg:false,
		        cardS:[],
		        weixin:false,
		        ImgS:'',
		        Bnurl:"",
		        dingS:"20181130154635450",
		        timeS:null,
		        weixinM:1,
		        searchMore:"",
		        zhuCard:"",
		        userTypes:"",
		        chargingCards:[],
		        cardfu:[],
			}
		},
		components:{
	    	'v-top':top,
	 	},
		created(){
			this.ready();
		},
		filters:{
			formatDate(time){
				let date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
			}
		},
		methods:{
			rowDblclick(row){
				//console.log(row);
				localStorage.setItem("userItem",JSON.stringify(row));
				this.$router.push({path:"/consumptionR"});
			},
			zhuCardS(item,type){
				//console.log(item,type);
				if(type==1){
					//console.log(item,this.cards);
					var a = "";
					var b = [];
					for(var i=0;i<item.length;i++){
						if(item[i].type=="1"){
							a = item[i].codeOnCard;
						}
					}
					for(var n=0;n<this.cards.length;n++){
						if(this.cards[n]!=a){
							b.push(this.cards[n]);
						}
					}
					//console.log(b);
					this.cards = b;
					this.chargingS.cards = b[0];
					//console.log(b);
				}
				else{
					this.cards = this.cardfu;
				}
				

			},
			openWin(){
				this.dialogFormVisible = true;
			},
			zant(){
				window.clearInterval(this.timeS);
				this.timeS = null;
			},
			moreD(item){
				this.timeS = window.setInterval(()=>{
					this.dingdan(item);
				},3000);
			},
			dingdan(item){
				var data = {
					number:item
				}
				this.$axios.post(this.baseURL+"/f/recharge/wxOrderQuery",this.$qs.stringify(data))
				.then(er=>{
					//console.log(er);
					var success = er.data.success;
					if(success==1){
						this.closeWin();
						this.$message.success("充值成功！");
						
					}
					else if(success==4){
						this.weixinM = 4;
						//this.$message.error("充值超时！");
						this.zant();
					}
				}).catch(err=>{
					//console.log(err);
					return false;
				});
			},
			yinlianS(item){
				var a = JSON.parse(localStorage.getItem("user"));
				var type = "";
				if(this.userType==false){
					type = "2";
				}else{
					type = "3";
				}
				var amount = item.balance;
				var cardSerial = "";
				for(var i=0;i<this.cardS.length;i++){
					if(item.cards == this.cardS[i].codeOnCard){
						cardSerial = this.cardS[i].serial;
					}
				}
				////console.log(cardSerial);
				var userKey = a.userKey;
				var userId = a.userId;
				var b = [];
				b.push(type);
				b.push(amount);
				b.push(cardSerial);
				b.push(userKey);
				var c = sort_ASCII(b);
				//console.log(c);
				var d = c.join("");
				//console.log(d);
				var appKey = userId + hex_sha1(d);
				window.open(this.baseURL+"/f/recharge/aliUnionpay?appKey="+appKey+"&amount="+amount+"&type="+type+"&cardSerial="+cardSerial);
				function sort_ASCII(obj){
				  var arr = new Array();
				  var num = 0;
				  for (var i in obj) {
				    arr[num] = i;
				    num++;
				  }
				  var sortArr = arr.sort();
				  var sortObj = [];
				  for (var i in sortArr) {
				    sortObj[sortArr[i]] = obj[sortArr[i]];
				  }
				  return sortObj;
				}
			},
			zhifubaoS(item){
				var a = JSON.parse(localStorage.getItem("user"));
				var type = "";
				if(this.typess="个人用户"){
					type = "0";
				}else{
					type = "1";
				}
				var amount = item.balance;
				var cardSerial = "";
				for(var i=0;i<this.cardS.length;i++){
					if(item.cards == this.cardS[i].codeOnCard){
						cardSerial = this.cardS[i].serial;
					}
				}
				////console.log(cardSerial);
				var userKey = a.userKey;
				var userId = a.userId;
				var b = [];
				b.push(type,amount,cardSerial,userKey);
				var c = sort_ASCII(b);
				//console.log(c);
				var d = c.join("");
				var appKey = userId + hex_sha1(d);
				window.open(this.baseURL+"/f/recharge/aliUnionpay?appKey="+appKey+"&amount="+amount+"&type="+type+"&cardSerial="+cardSerial);
				this.closeWin();
				setTimeout(()=>{this.ready();},20000);
				function sort_ASCII(obj){
				  var arr = new Array();
				  var num = 0;
				  for (var i in obj) {
				    arr[num] = i;
				    num++;
				  }
				  var sortArr = arr.sort();
				  var sortObj = [];
				  for (var i in sortArr) {
				    sortObj[sortArr[i]] = obj[sortArr[i]];
				  }
				  return sortObj;
				}
			},
			weixinS(item){
				this.weixin = true;
				var a = JSON.parse(localStorage.getItem("user"));
				var type = "";
				if(this.typess="个人用户"){
					type = "0";
				}else{
					type = "1";
				}
				var amount = item.balance;
				var cardSerial = "";
				for(var i=0;i<this.cardS.length;i++){
					if(item.cards == this.cardS[i].codeOnCard){
						cardSerial = this.cardS[i].serial;
					}
				}
				////console.log(cardSerial);
				var userKey = a.userKey;
				var userId = a.userId;
				var b = [];
				b.push(type,amount,cardSerial,userKey);
				var c = sort_ASCII(b);
				//console.log(c);
				var d = c.join("");
				var appKey = userId + hex_sha1(d);
				////console.log(appKey);
				var data={
					appKey:appKey,
					type:type,
					amount:amount,
					cardSerial:cardSerial
				}
				//console.log(data);
				this.$axios.post(this.baseURL+"/f/recharge/wxpay",this.$qs.stringify(data)).then(er=>{
					//console.log(er);
					var success = er.data.success;
					var message = er.data.message;
					if(success == 1){
						var a = er.data.data.url;
						var b = er.data.data.number;
						this.Bnurl = urlS(a);
						//console.log(this.Bnurl);
						this.moreD(b);
					}
					else{
						this.$message.error(message);
						this.closeWin();
						return false;
					}
				}).catch(err=>{
					this.$message.error("内部错误！");
					this.closeWin();
					//console.log(err);
				});
				function sort_ASCII(obj){
				  var arr = new Array();
				  var num = 0;
				  for (var i in obj) {
				    arr[num] = i;
				    num++;
				  }
				  var sortArr = arr.sort();
				  var sortObj = [];
				  for (var i in sortArr) {
				    sortObj[sortArr[i]] = obj[sortArr[i]];
				  }
				  return sortObj;
				}
				function urlS(item){
			      var a = item.replace("http://localhost:8086","http://pay.szgyxny.com:8086");
			      ////console.log(a);
			      return a;
			    }
			},
			zhufuS(item){
				//console.log(item);
				var a = JSON.parse(localStorage.getItem("user"));
				var amount = item.balance;
				var cardSerial = "";
				var zhuSerial = "";
				for(var n=0;n<this.cardB.length;n++){
					if(this.cardB[n].cardType == "1"){
						zhuSerial = this.cardB[n].Serial;
					}
				}
				for(var i=0;i<this.cardS.length;i++){
					if(item.cards == this.cardS[i].codeOnCard){
						cardSerial = this.cardS[i].serial;
					}
				}
				////console.log(cardSerial);
				var userKey = a.userKey;
				var userId = a.userId;
				var b = [];

				b.push(amount,cardSerial,zhuSerial,userKey);
				var c = sort_ASCII(b);
				//console.log(c);
				var d = c.join("");
				var appKey = userId + hex_sha1(d);
				var data = {
					appKey:appKey,
					cardSerial:cardSerial,
					masterCardSerial:zhuSerial,
					amount:amount
				}
				//console.log(data);
				this.$axios.post(this.baseURL+"/f/recharge/zfRecharge",this.$qs.stringify(data))
					.then(er=>{
						//console.log(er);
						var success = er.data.success;
						var message = er.data.message;
						if(success==1){
							this.$message.success(message);
						}
						else{
							this.$message.error(message);
						}
						this.closeWin();
					}).catch(err=>{
						//console.log(err);
						this.$message.error("内部错误！");
						this.closeWin();
					});

				function sort_ASCII(obj){
				  var arr = new Array();
				  var num = 0;
				  for (var i in obj) {
				    arr[num] = i;
				    num++;
				  }
				  var sortArr = arr.sort();
				  var sortObj = [];
				  for (var i in sortArr) {
				    sortObj[sortArr[i]] = obj[sortArr[i]];
				  }
				  return sortObj;
				}
			},
			chargingMore(item){
				//console.log(item);
				if(item.type==2){
					//this.weixin=true;
					this.weixinS(item);
				}
				else if(item.type==1){
					this.zhifubaoS(item);
					//this.zhifubao = true;
				}
				else if(item.type==3){
					this.zhufuS(item);
					//this.yinlian = true;
				}
			},
			handleClick(tab, event) {
		        //console.log(tab, event);
		     },
			closeWin(){
				this.zant();
				this.cards = this.cardfu;
				this.chargingS.type = 1;
				this.weixinM = 1;
				this.chargingS.balance="";
				this.Bnurl = "";
				this.dialogFormVisible = false;
				this.fromImg = false;
				this.weixin=false;
				this.ready();
			},
			getCharging(item){
				//console.log(item);
				if(itemS(item)==true){
					if(item.type=="微信充值"){
						var amount = item.balance;
						var cardSerial = item.cards;
						var type = "";
						if(userType==true){
							type="1";
						}
						else{
							type="0";
						}
						var a = [];
						a.push({key:amount});
						a.push({key:cardSerial});
						a.push({key:type});
						a.push({key:this.user.userKey});
					}
				}
				function itemS(item){
					if(item.balance!=null&&item.balance!=""){
						return true;
					}
					else{
						return false;
					}
				}
				//this.$router.push({path:"/charging"});
			},
			clickLi(item){
				//console.log(item);
			},
			ready(){
				var a = JSON.parse(localStorage.getItem("loginUser"));
				var b = JSON.parse(localStorage.getItem("user"));
				//alert(b.userKey);
				if(a!=""&&a!=null){
					//console.log(a.types);
					//var cards = [];
					var appkey = b.userId + hex_sha1(b.userKey);
					var c = {
						appKey:appkey
					};
					this.userTypes = a.types;
					//console.log(c);
					if(a.types=="个人用户"){
						this.$axios.post(this.baseURL+"/f/record/getUserCard",this.$qs.stringify({
							appKey:appkey
						}))
						.then(er=>{
							console.log(er);
							var success = er.data.success;
							var message = er.data.message;
							if(success==1){
								var data = er.data.data;
								var count = er.data.data.Count;
								this.countS = count;
								var cards = [];
								var card = [];
								var cardS = [];
								if(count>1){
									for(var i=0;i<data.CardList.length;i++){
										cards.push(data.CardList[i].Serial
										);
										card.push({
											serial:data.CardList[i].Serial,
											codeOnCard:data.CardList[i].CodeOnCard
										});
										cardS.push(data.CardList[i].CodeOnCard);
									}
									this.chargingS.cards = cardS[0];
								}
								else if(count==1){
									cards.push(data.CardList[0].Serial);
									card.push({
											serial:data.CardList[0].Serial,
											codeOnCard:data.CardList[0].CodeOnCard
										});
									cardS.push(data.CardList[0].CodeOnCard);
									this.chargingS.cards = cardS[0];
								}
								else{
									cards = [];
								}
								var cardb = [];
								cardb.push(
									data.CardList[0]
								);
								data.CardList[0].Balance=data.CardList[0].Balance.toFixed(2);
								console.log(cardb);
								// for(var m=0;m<data.CardList.length;m++){
								// 	if(data.CardList[m].cardType=='1'){
								// 		data.CardList[m].style="color:blue;";
								// 	}
									
									

								// }
								this.cardB = cardb;
								this.cards = cardS;
								this.cardfu = cardS;
								this.cardS = card;
								this.chargings(a.types,b,cards);
								this.consumptions(a.types,b,cards);
								////console.log(ab);
							}
							else if(success ==2){
								this.$message.error("验证实效，请重新登录！");
								this.$router.push({path:"/"});
								return false;
							}
							else{
								//this.$message.error(message);
								return false;
							}
						}).catch(err=>{
							//this.$message.error("内部出错！");
							//console.log(err);
							return false;
						});
					}
					else if(a.types=="企业用户"){
						this.userType = true;
						this.$axios.post(this.baseURL+"/f/record/getEUserCard",this.$qs.stringify(c))
						.then(er=>{
							//console.log(er);
							var success = er.data.success;
							var message = er.data.message;
							if(success==1){
								var data = er.data.data;
								var count = er.data.data.Count;
								this.countS = count;
								var cards = [];
								var card = [];
								var cardS = [];
								if(count>1){
									for(var i=0;i<data.CardList.length;i++){
										cards.push(data.CardList[i].Serial
										);
										card.push({
											serial:data.CardList[i].Serial,
											type:data.CardList[i].cardType,
											codeOnCard:data.CardList[i].CodeOnCard
										});
										cardS.push(data.CardList[i].CodeOnCard);
									}
									this.chargingS.cards = cardS[0];
								}
								else if(count==1){
									cards.push(data.CardList[0].Serial);
									card.push({
											serial:data.CardList[0].Serial,
											type:data.CardList[i].cardType,
											codeOnCard:data.CardList[0].CodeOnCard
										});
									cardS.push(data.CardList[0].CodeOnCard);
									this.chargingS.cards = cardS[0];
								}
								else{
									cards = [];
								}
								var cardb = [];
								for(var m=0;m<data.CardList.length;m++){
									if(data.CardList[m].cardType=='1'){
										data.CardList[m].style="color:blue;";
									}
									data.CardList[m].Balance=data.CardList[m].Balance.toFixed(2);
									cardb.push(data.CardList[m]);

								}
								//console.log(cardb);
								this.cardB = cardb;
								this.cards = cardS;
								this.cardfu = cardS;
								this.cardS = card;
								this.chargings(a.types,b,cards);
								this.consumptions(a.types,b,cards);

							}
							else if(success ==2){
								this.$message.error("验证实效，请重新登录！");
								this.$router.push({path:"/"});
								return false;
							}
							else{
								//this.$message.error(message);
								return false;
							}
						}).catch(err=>{
							//this.$message.error("内部出错！");
							//console.log(err);
							return false;
						});
					}
					else{
						return false;
					}
					
				}
			},
			chargings(type,item,cards){
				//console.log(type,item,cards);
				var types = "";
				if(type=="个人用户"){
					types="0";
				}
				else if (type=="企业用户"){
					types="1";
				}
				else{
					types="2";
				}
				var a = types+item.userKey;
				var appKey = item.userId+hex_sha1(a);
				//console.log(a,appKey);
				var data={
					type:types,
					appKey:appKey
				}
				this.$axios.post(this.baseURL+"/f/record/totalRecharge",this.$qs.stringify(data)).then(er=>{
					console.log(er);
					var success=er.data.success;
					var message = er.data.message;
					if(success==1){
						var data = er.data.data.TotalRecharges;
						var count = er.data.data.Count;
						//console.log(data,count);
						if(count>1){
							var charge = [];
							//var serial = [];
							for(var i=0;i<data.length;i++){
								charge.push(data[i].TotalRecharge);
							}
							this.chargeS = sum(charge).toFixed(2);
							this.moreCharge(type,cards,item);
						}
						else if(count == 1){
							var chargeS = "";
							chargeS = data[0].TotalRecharge;
							this.chargeS = chargeS.toFixed(2);
							this.moreCharge(type,cards,item);
							//console.log(this.chargeS);
						}
						else{
							this.chargeS = '0.00';
							this.Chargings = [];
						}
					}
					else{
						this.$message.error(message);
						return false;
					}
				}).catch(err=>{
					this.$message.error("内部错误！");
					//console.log(err);
				})
				function sum(arr) {
				    var s = 0;
				    for (var i=arr.length-1; i>=0; i--) {
				        s += arr[i];
				    }
				    return s;
				}
			},
			consumptions(type,item,cards){
				//console.log(type,item,cards);
				var types = "";
				if(type=="个人用户"){
					types="0";
				}
				else if (type=="企业用户"){
					types="1";
				}
				else{
					types="2";
				}
				var a = types+item.userKey;
				var appKey = item.userId+hex_sha1(a);
				//console.log(a,appKey);
				var data={
					type:types,
					appKey:appKey
				}
				this.$axios.post(this.baseURL+"/f/record/totalConsumption",this.$qs.stringify(data)).then(er=>{
					console.log(er);
					var success=er.data.success;
					var message = er.data.message;
					if(success==1){
						var data = er.data.data.TotalConsumptions;
						var count = er.data.data.Count;

						//console.log(data,count);
						if(count>1){
							var balance = [];
							for(var i=0;i<data.length;i++){
								balance.push(data[i].TotalConsumption);
							}
							this.consumptionS = sum(balance).toFixed(2);
							this.moreConsumption(type,cards,item);
						}
						else if(count==1){
							this.consumptionS = data[0].TotalConsumption.toFixed(2);
							//console.log(this.consumptionS);
							this.moreConsumption(type,cards,item);
						}
						else{
							this.consumptionS = '0.00';
							this.Consumptions = [];
						}
					}
					else{
						this.$message.error(message);
						return false;
					}
				}).catch(err=>{
					this.$message.error("内部错误！");
					//console.log(err);
				})
				function sum(arr) {
				    var s = 0;
				    for (var i=arr.length-1; i>=0; i--) {
				        s += arr[i];
				    }
				    return s;
				}
			},
			moreCharge(type,cards,user){
				//console.log(type,cards,user);
				//alert(user.userKey);
				var types = "";
		        if(type=="个人用户"){
		        	if(cards.length==1){
		        		types="0"
		        	}
		        	else{
		        		types="1";
		        	}
		        }
		        else if(type=="企业用户"){
		        	types="2";
		        }
		        var cardSerial = "";
		        if(cards.length>1){
		        	cardSerial = cards.join(",");
		        }
		        else if(cards.length==1){
		        	cardSerial = cards[0];
		        }
		        else{
		        	cardSerial = [];
		        }
		        //console.log(cardSerial);
		        var d = [];
		        var pageSize = "5";
		        d.push({key:types});
		        d.push({key:cardSerial});
		        d.push({key:pageSize});
		        d.sort(function(a,b){return a.key+"">b.key+""?1:-1});
		        //console.log(d);
		        var e = [];
		        for(var i=0;i<d.length;i++){
		        	e.push(d[i].key);
		        }
		        let f = sort_ASCII(e);
		        //console.log(f);
		        var some = "";
		        //var g = [];
		        // for(var v=0;v<f.length;v++){
		        // 	g.push(f[i]);
		        // }
		        some = e.join("")+user.userKey;
		        //console.log(some);
		        var appKey = user.userId + hex_sha1(some);
		        var data = {
			        	appKey:appKey,
			        	cardSerial:cardSerial,
			        	type:types,
			        	pageSize:pageSize,
			        }
			    //console.log(data);
			    this.$axios.post(this.baseURL+"/f/record/rechargeRecord",this.$qs.stringify(data)).then(er=>{
		        	//console.log(er);
		        	var success = er.data.success;
		        	var message = er.data.message;
		        	if(success==1){
		        		var data = er.data.data.RecordList;
		        		this.Chargings = data;
		        	}
		        	else{
		        		this.$message.error(message);
		        		return false;
		        	}
		        }).catch(err=>{
		        	this.$message.error("内部错误！");
		        	//console.log(err);
		        	return false;
		        })
		        //console.log(data);
		        function sort_ASCII(obj){
				  var arr = new Array();
				  var num = 0;
				  for (var i in obj) {
				    arr[num] = i;
				    num++;
				  }
				  var sortArr = arr.sort();
				  var sortObj = [];
				  for (var i in sortArr) {
				    sortObj[sortArr[i]] = obj[sortArr[i]];
				  }
				  return sortObj;
				}
			},
			moreConsumption(type,cards,user){
				//console.log(type,cards,user);
				var types = "";
		        if(type=="个人用户"){
		        	if(cards.length==1){
		        		types="0"
		        	}
		        	else{
		        		types="1";
		        	}
		        }
		        else if(type=="企业用户"){
		        	types="2";
		        }
		        var cardSerial = "";
		        if(cards.length>1){
		        	cardSerial = cards.join(",");
		        }
		        else if(cards.length==1){
		        	cardSerial = cards[0];
		        }
		        else{
		        	cardSerial = [];
		        }
		        var d = [];
		        var pageSize = 5;
		        d.push({key:types});
		        d.push({key:cardSerial});
		        d.push({key:pageSize});
		        d.sort(function(a,b){return a.key+"">b.key+""?1:-1});
		        var e = [];
		        for(var i=0;i<d.length;i++){
		        	e.push(d[i].key);
		        }
		        let f = sort_ASCII(e);
		        //console.log(f);
		        var some = "";
		        //var g = [];
		        // for(var v=0;v<f.length;v++){
		        // 	g.push(f[i]);
		        // }
		        some = e.join("")+user.userKey;
		        var appKey = user.userId + hex_sha1(some);
		        var data = {
			        	appKey:appKey,
			        	cardSerial:cardSerial,
			        	type:types,
			        	pageSize:pageSize,
			        }
			    //console.log(data);
			    this.$axios.post(this.baseURL+"/f/record/consumptionRecord",this.$qs.stringify(data)).then(er=>{
		        	//console.log(er);
		        	var success = er.data.success;
		        	var message = er.data.message;
		        	if(success==1){
		        		var data = er.data.data.RecordList;
		        		this.Consumptions = data;
		        	}
		        	else{
		        		this.$message.error(message);
		        		return false;
		        	}
		        }).catch(err=>{
		        	this.$message.error("内部错误！");
		        	//console.log(err);
		        	return false;
		        })
		        //console.log(data);
		        function sort_ASCII(obj){
				  var arr = new Array();
				  var num = 0;
				  for (var i in obj) {
				    arr[num] = i;
				    num++;
				  }
				  var sortArr = arr.sort();
				  var sortObj = [];
				  for (var i in sortArr) {
				    sortObj[sortArr[i]] = obj[sortArr[i]];
				  }
				  return sortObj;
				}
			},
			chargingIn(){
				this.$router.push({path:'/chargingR'});
			},
			consumptionIn(){
				this.$router.push({path:'/consumptionR'});
			},
		},
	}
</script>

<style>
	.el-dialog__title{
		font-size: 26px;
		color: #409EFF;
	}
</style>