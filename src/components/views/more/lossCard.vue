<template>
	<div class="body">
		<v-top></v-top>
		<div class="somes">
			<div class="common_center">
				<div class="btn">
					<ul class="btn_ul">
						<li v-for="li in btns" :class="li.isBtn">
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
							<h3 style="line-height:40px;font-size: 16px;">挂失流程：</h3>
							<el-button class="buttons" type="primary" round @click="lossFrom = true">紧急锁卡</el-button>
						</div>
						<div class="loss">
							<p style="line-height:40px;font-size: 16px;color:#888;">1、确认遗失卡片信息。</p>
							<p style="line-height:40px;font-size: 16px;color:#888;">2、电话联系客服或本人带好注册材料来的新能源公司进行挂失。</p>
							<p style="line-height:40px;font-size: 16px;color:#888;">
								注：
								
							</p>
							<p style="line-height:30px;font-size: 12px;color:#888">(1)  电话：400-928-8889</p>
							<p style="line-height:30px;font-size: 12px;color:#888">(2)  地址：江苏省无锡市锡山区安镇街道东盛路666号</p>
							<p style="line-height:30px;font-size: 12px;color:#888">(3)  材料：本人有效身份证、手机</p>
							<p style="line-height:30px;font-size: 12px;color:#888;padding-bottom:20px;">(4)  日期：当天</p>
						</div>
						<div style="margin-top:10px;" class="um_top">
							
							<h3 style="line-height:40px;font-size: 16px;">补办流程：</h3>
						</div>
						<div class="loss">
							<p style="line-height:40px;font-size: 16px;color:#888;">1、准备好注册材料。</p>
							<p style="line-height:40px;font-size: 16px;color:#888;">2、本人带好注册材料来的新能源公司进行补办。</p>
							<p style="line-height:40px;font-size: 16px;color:#888;">3、补办费用：20元/人（工本费），支持顺丰快递到付。</p>
							<p style="line-height:40px;font-size: 16px;color:#888;">
								注：
								
							</p>
							<p style="line-height:30px;font-size: 12px;color:#888">(1)  电话：400-928-8889</p>
							<p style="line-height:30px;font-size: 12px;color:#888">(2)  地址：江苏省无锡市锡山区安镇街道东盛路666号</p>
							<p style="line-height:30px;font-size: 12px;color:#888">(3)  材料：本人有效身份证、手机</p>
							<p style="line-height:30px;font-size: 12px;color:#888">(4)  单位：单位有效证件、发票原件、经办人个人有效证件、卡上充值金额要大于消费金额且卡面金额大于0。</p>
							<p style="line-height:30px;font-size: 12px;color:#888">(5)  补办或退款金额以卡面金额为准。</p>
							<p style="line-height:30px;font-size: 12px;color:#888;padding-bottom:20px;">(6)  日期：20个工作日内包含邮寄时间。</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<el-dialog title="紧急锁卡" width="600px" :visible.sync="lossFrom" @close="closeWin">
		  <el-form :model="form">
		    <el-form-item label="选择卡号：" :label-width="formLabelWidth">
		      <el-select v-model="form.card" placeholder="请选择卡号">
		        <el-option v-for="some in cards" :key="some" :value='some' :label="some"></el-option>
		      </el-select>
		    </el-form-item>
		    <el-form-item label="输入登录密码：" :label-width="formLabelWidth">
		    	<el-input type="password" v-model="form.password" style="width:210px;" autocomplete="off"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="closeWin">取 消</el-button>
		    <el-button type="primary" @click="lossCardS(form)">确 定</el-button>
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
		name:"lossCard",
		data(){
			return{
				btns:[
					{id:"0",name:"数据总览",icon:"icon-jiaoyizonglan",isBtn:"",to:"/first"},
					{id:"1",name:"充值记录",icon:"icon-xiaofei01",isBtn:"",to:"/chargingR"},
					{id:"2",name:"消费记录",icon:"icon-chuanyuejilu",isBtn:"",to:"/consumptionR"},
					{id:"3",name:"挂失补办",icon:"icon-yishibuzheng",isBtn:"btn_btn",to:"/lossCard"},
					{id:"4",name:"常见问题",icon:"icon-changjianwenti",isBtn:"",to:"/problems"},
				],
				userType:false,
				Chargings:[
				],
				Consumptions:[
					{id:"0",name:'用户1',balance:'9.31',degree:"2.45",time:"2018-11-01"},
					{id:"1",name:'用户1',balance:'9.31',degree:"2.45",time:"2018-11-02"},
					{id:"2",name:'用户1',balance:'9.31',degree:"2.45",time:"2018-11-03"},
					{id:"3",name:'用户1',balance:'9.31',degree:"2.45",time:"2018-11-04"},
					{id:"4",name:'用户1',balance:'9.31',degree:"2.45",time:"2018-11-05"},
				],
				user:[],
				height:[],
				cards:[],
				typess:"",
				dateFrom:"",
				dateTo:"",
				fullscreenLoading: false,
				empty:"请查询！",
				key:[],
				checkAll:true,
				isIndeterminate: false,
				currentPage:1,
				pageSizes:10,
				moreCard:[],
				total:0,
				pageOn:true,
				lossFrom:false,
				form: {
			      card:"",
			      type:0,
			      appKey:"",
			      password:"",
			    },
			    formLabelWidth: '120px',
			}
		},
		components:{
	    	'v-top':top,
	 	},
	 	filters:{
			formatDate(time){
				let date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
			}
		},
		created(){
			this.ready();
		},
		methods:{
			closeWin(){
				this.form = {
			      card:"",
			      type:0,
			      appKey:"",
			      password:"",
			    };
				this.lossFrom = false;
			},
			ready(){
				var a = JSON.parse(localStorage.getItem("loginUser"));
				var b = JSON.parse(localStorage.getItem("user"));
				this.user = b;
				this.typess = a.types;
				//console.log(b);
				var appkey = b.userId + hex_sha1(b.userKey);
				var c = {
					appKey:appkey
				};
				//console.log(c);
				if(a.types=="个人用户"){
					this.$axios.post(this.baseURL+"/f/record/getUserCard",this.$qs.stringify({
						appKey:appkey
					}))
					.then(er=>{
						////console.log(er);
						var success = er.data.success;
						var message = er.data.message;
						if(success==1){
							//this.$message.success(message);
							var data = er.data.data;
							var count = er.data.data.Count;
							if(count>1){
								var ab = [];
								var key = [];
								for(var i=0;i<data.CardList.length;i++){
									ab.push(data.CardList[i].CodeOnCard);
									key.push({
										serial:data.CardList[i].Serial,
										codeOnCard:data.CardSerial[i].CodeOnCard,
									});
								}
								//this.key = ab;
								this.cards = ab;
								this.moreCard = key;
								//this.checkAll = true;
								//this.getCheckedKeys();
							}
							else{
								var ab = [data.CardList[0].CodeOnCard];
								var key = {
									serial:data.CardList[0].Serial,
									codeOnCard:data.CardList[0].CodeOnCard,
								};
								//this.key = ab;
								this.cards = ab;
								this.moreCard = key;
								//this.checkAll = true;
								//this.getCheckedKeys();
							}
							//console.log(key);
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
					this.form.type=1;
					this.$axios.post(this.baseURL+"/f/record/getEUserCard",this.$qs.stringify(c))
					.then(er=>{
						////console.log(er);
						var success = er.data.success;
						var message = er.data.message;
						if(success==1){
							var data = er.data.data;
							var count = er.data.data.Count;
							if(count>1){
								var ab = [];
								var key = [];
								for(var i=0;i<data.CardList.length;i++){
									ab.push(data.CardList[i].CodeOnCard);
									key.push({
										serial:data.CardList[i].Serial,
										codeOnCard:data.CardList[i].CodeOnCard,
									});
								}
								//this.key = ab;
								this.cards = ab;
								this.moreCard = key;
								//this.checkAll = true;
								//this.getCheckedKeys();
							}
							else{
								var ab = [data.CardList[0].CodeOnCard];
								var key = {
									serial:data.CardList[0].Serial,
									codeOnCard:data.CardList[0].CodeOnCard,
								};
								//this.key = ab;
								this.cards = ab;
								this.moreCard = key;
								//this.checkAll = true;
								//this.getCheckedKeys();
							}
							////console.log(ab);
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
			},
			lossCardS(item){
				var user = JSON.parse(localStorage.getItem("user"));
				var a = [];
				var card = this.moreCard;
				var serial = "";
				var password = hex_sha1(item.password);
				//console.log(card,user);
				if(card.length>1){
					for(var i = 0;i<card.length;i++){
						if(item.card == card[i].codeOnCard){
							a.push(card[i].serial);
							serial = card[i].serial;
						}
					}	
				}
				else{
					if(card.codeOnCard!=null){
						a.push(card.serial);
						serial = card.serial;
					}
					else{
						return false;
					}
				}
				a.push(item.type);
				a.push(password);
				//console.log(a);
				a.sort(function(a,b){return a+"">b+""});
			    var b = sort_ASCII(a);
			    var some = b.join("")+user.userKey;
			    //console.log(some);
			    var appKey = user.userId + hex_sha1(some);
			    var data={
			    	appKey:appKey,
			    	type:item.type,
			    	serial:serial,
			    	password:password,
			    };
			    //console.log(data);
			    this.$axios.post(this.baseURL+"/f/record/lockCard",this.$qs.stringify(data))
			    .then(er=>{
			    	//console.log(er);
			    	var success = er.data.success;
			    	var message = er.data.message;
			    	if(success=1){
			    		this.closeWin();
			    		this.$message.success(message);
			    	}
			    	else{
			    		this.closeWin();
			    		this.$message.error(message);
			    	}
			    }).catch(err=>{
			    	this.closeWin();
			    	this.$message.error("内部错误！");
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
				};
			},
		},
	}
</script>

<style>
	.userMore .loss{
		width: 100%;
		display: block;
		background-color: #fff;
	}
	.userMore .loss p{
		margin-left: 20px;
	}
</style>