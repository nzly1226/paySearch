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
							<i class="iconfonts" style="font-size:28px; color:#409EFF">&#xe60b;</i>
							<h3 style="line-height:40px;font-size: 16px;">充值记录：</h3>
						</div>
						<div class="text">
							<div class="text_top">
								<h4 style="padding-top:20px;">检索条件：</h4>

								<ul>
									<li style="margin-bottom:20px;overflow:hidden;">
										<span style="float:left;display:block;margin-right:20px;margin-bottom:10px;">
											<h6>开始时间：</h6>
											<el-date-picker
												v-model="dateFrom"
												type="date"
												value-format="yyyy-MM-dd"
												placeholder="选择日期"
											></el-date-picker>
										</span>
										<span style="float:left;display:block;margin-right:20px;margin-bottom:10px;">
											<h6>结束时间：</h6>
											<el-date-picker
												v-model="dateTo"
												type="date"
												value-format="yyyy-MM-dd"
												placeholder="选择日期"
											></el-date-picker>
										</span>
										<span style="float:left;display:block;margin-right:20px;margin-bottom:10px">
											<h6>选择卡号：</h6>
											<!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
												<div style="margin: 15px 0;"></div>
											<el-checkbox-group v-model="key" @change="handleCheckedCitiesChange">
											    <el-checkbox v-for="city in cards" :label="city" :key="city">{{city}}</el-checkbox>
											</el-checkbox-group> -->
											<el-select v-model="key" multiple collapse-tags placeholder="请选择">
												<el-option v-for="city in cards" :key="city" :label="city" :value="city"></el-option>
											</el-select>
										</span>
									</li>
									<li>
										<!-- <h6>选择卡号：</h6>
										<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
  										<div style="margin: 15px 0;"></div>
										<el-checkbox-group v-model="key" @change="handleCheckedCitiesChange">
										    <el-checkbox v-for="city in cards" :label="city" :key="city">{{city}}</el-checkbox>
										</el-checkbox-group>
										
										<el-select v-model="key" multiple collapse-tags placeholder="请选择">
											<el-option v-for="city in cards" :key="city" :label="city" :value="city"></el-option>
										</el-select> -->
										<div style="overflow:hidden;">
											<el-button style="float:left;" type="primary" icon="el-icon-search" @click.native="getCheckedKeys()">查询</el-button>
											<el-button style="float:left;" type="primary" icon="el-icon-message" @click.native="getMore()">导出</el-button>
										</div>
									</li>
								</ul>
							</div>
							<div style="width:100%;height:1px;background-color:#f1f1f1;display:block;"></div>
							<el-table
								:data="Chargings"
								style="width: 100%"
								height="350px"
								v-loading="fullscreenLoading"
								:empty-text="empty"
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
					  		<div style="overflow:hidden;">
								<el-pagination
								  style="margin-top:20px;margin-bottom:20px;float:right;margin-right: 30px;"
							      @size-change="handleSizeChange"
							      @current-change="handleCurrentChange"
							      :current-page.sync="currentPage"
							      :page-size="pageSizes"
							      layout="prev, pager, next, jumper"
							      :total="total"
							      :disabled="pageOn">
							    </el-pagination>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
	import top from '../common/header.vue'
	//import Btn from '../common/btn.vue'
	//import "v-top" from '../common/header.vue'
	import {formatDate} from '../../date.js'
	export default{
		name:"chargingR",
		data(){
			return{
				btns:[
					{id:"0",name:"数据总览",icon:"icon-jiaoyizonglan",isBtn:"",to:"/first"},
					{id:"1",name:"充值记录",icon:"icon-xiaofei01",isBtn:"btn_btn",to:"/chargingR"},
					{id:"2",name:"消费记录",icon:"icon-chuanyuejilu",isBtn:"",to:"/consumptionR"},
					{id:"3",name:"挂失补办",icon:"icon-yishibuzheng",isBtn:"",to:"/lossCard"},
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
				chargeS:[],
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
			handleSizeChange(val) {
		        //console.log(`每页 ${val} 条`);
		    },
		    handleCurrentChange(val) {
		        //console.log(`当前页: ${val}`);
		        this.getCheckedKeys();
		    },
			handleCheckAllChange(val) {
		        this.key = val ? this.cards : [];
		        this.isIndeterminate = false;
		    },
		    handleCheckedCitiesChange(value) {
		        let checkedCount = value.length;
		        this.checkAll = checkedCount === this.cards.length;
		        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cards.length;
		    },
			getCharging(){
				//this.$router.push({path:"/charging"});
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
								this.key = ab;
								this.cards = ab;
								this.moreCard = key;
								//this.checkAll = true;
								this.getCheckedKeys();
							}
							else{
								var ab = [data.CardList[0].CodeOnCard];
								var key = {
									serial:data.CardList[0].Serial,
									codeOnCard:data.CardList[0].CodeOnCard,
								};
								this.key = ab;
								this.cards = ab;
								this.moreCard = key;
								//this.checkAll = true;
								this.getCheckedKeys();
							}
							//console.log(ab,this.key);
						}
						else if(success ==2){
								this.$message.error("验证实效，请重新登录！");
								this.$router.push({path:"/"});
								return false;
							}
						else{
							//this.$message.error(message);
							this.empty = "暂无数据！";
							return false;
						}
					}).catch(err=>{
						//this.$message.error("内部出错！");
						//console.log(err);
						this.empty = "内部错误！";
						return false;
					});
				}
				else if(a.types=="企业用户"){
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
								this.key = ab;
								this.cards = ab;
								this.moreCard = key;
								//this.checkAll = true;
								this.getCheckedKeys();
							}
							else{
								var ab = [data.CardList[0].CodeOnCard];
								var key = {
									serial:data.CardList[0].Serial,
									codeOnCard:data.CardList[0].CodeOnCard,
								};
								this.key = ab;
								this.cards = ab;
								this.moreCard = key;
								//this.checkAll = true;
								this.getCheckedKeys();
							}
							////console.log(ab);
						}
						else if(success ==2){
								this.$message.error("验证实效，请重新登录！");
								this.$router.push({path:"/"});
								return false;
							}
						else{
							//this.$message.error(message);
							this.empty = "暂无数据！";
							return false;
						}
					}).catch(err=>{
						//this.$message.error("内部出错！");
						//console.log(err);
						this.empty = "内部错误！";
						return false;
					});
				}
				else{
					return false;
				}
			},
			getCheckedKeys(){
				//this.empty = "加载中...";
		        var a = this.key;
		        var pageSize = this.pageSizes;
		        var pageNo = this.currentPage;
		        ////console.log(a);
		        var b = this.cards;
		        var Mcards = this.moreCard;
		        ////console.log(Mcards);
		        if(a[0]!=null){
		        	this.fullscreenLoading = true;
		        	var dateFrom = this.dateFrom;
			        var dateTo = this.dateTo;
			        var pageSize = this.pageSizes;
			        let dateOne ="";
			        if(dateFrom!=null&&dateFrom!=""){
			        	dateOne = dateFrom;
			        }
			        if(dateFrom==null){
			        	dateFrom = ""
			        }
			        if(dateTo==null){
			        	dateTo = ""
			        }
			        //console.log(this.user,dateFrom,dateTo,Mcards);
			        var c = [];
			        var d = [];
			        var length = a.length;
			        if(length>1){
			        	for(var i = 0;i<Mcards.length;i++){
				        	for(var v=0;v<a.length;v++){
				        		if(Mcards[i].codeOnCard==a[v]){
				        			c.push(Mcards[i].serial);
				        		}
				        	}
				        }
			        }
			        else if(length==1){
			        	var moreM = Mcards.length;
			        	if(moreM==null){
			        		c.push(Mcards.serial);
			        	}
			        	else if(moreM>1&&moreM!=null){
			        		for(var n=0;n<Mcards.length;n++){
			        			if(a[0]==Mcards[n].codeOnCard){
			        				c.push(Mcards[n].serial);
			        			}
			        		}
			        	}
			        	else{
			        		return false;
			        	}
			        }
			        else{
			        	return false;
			        }
			        ////console.log(c);
			        var cardSerial = "";
			        if(c.length>1){
			        	cardSerial = c.join(",");
			        }
			        else if(c.length==1){
			        	cardSerial = c[0];
			        }
			        else{
			        	cardSerial = [];
			        }
			        //console.log(cardSerial);
			        var type = "";
			        if(this.typess=="个人用户"){
			        	if(c.length==1){
			        		type=0;
			        	}
			        	else if(c.length>1){
			        		type = 1;
			        	}
			        }
			        else if(this.typess=="企业用户"){
			        	type=2;
			        }
			        var some = "";
			        if(dateOne==""&&dateOne==null){
			        	d.push(type);
			        	d.push(pageNo);
			        	d.push(pageSize);
			        	d.push(cardSerial);
			        	
			        }
			        else{
			        	d.push(pageNo);
			        	d.push(pageSize);
			        	d.push(type);
			        	d.push(cardSerial);
			        	d.push(dateFrom);
			        	d.push(dateTo);
			        }
			        d.sort(function(a,b){return a+"">b+""?1:-1});
			        //console.log(d);
			        var e = sort_ASCII(d);
			        //console.log(e);
			        // var g = [];
			        // for(var i=0;i<e.length;i++){
			        // 	g.push(e[i].key);
			        // }
			        // //console.log(g);
			        some = d.join("")+this.user.userKey;
			        //console.log(some);
			        var appKey = this.user.userId + hex_sha1(some);
			        var data="";
			        if(dateOne==null&&dateOne==""){
			        	data = {
				        	appKey:appKey,
				        	cardSerial:cardSerial,
				        	type:type,
				        	pageSize:pageSize,
				        	pageNo:pageNo,
				        }
			        }
			        else{
			        	data = {
				        	appKey:appKey,
				        	cardSerial:cardSerial,
				        	type:type,
				        	startDate:dateFrom,
				        	endDate:dateTo,
				        	pageSize:pageSize,
				        	pageNo:pageNo,
				        }
			        }
			        console.log(data);
			        //console.log(hex_sha1(some));
			       	var A = hex_sha1("02018-06-012018-11-1320388aa13c5aa2d2ae67");
			        //console.log(A);
			        this.$axios.post(this.baseURL+"/f/record/rechargeRecord",this.$qs.stringify(data)).then(er=>{
			        	console.log(er);
			        	var success = er.data.success;
			        	var message = er.data.message;
			        	if(success==1){
			        		var data = er.data.data.RecordList;
			        		var count = er.data.data.TotalCount;
			        		this.total = parseInt(count);
			        		this.pageOn = false;
			        		if(count<=0){
			        			this.empty = "暂无数据！";
			        			this.pageOn = false;
			        		}
			        		this.Chargings = data;
			        		setTimeout(()=>{
			        			this.fullscreenLoading = false;
			        		},500);
			        	}
			        	else{
			        		this.empty = "加载失败，稍后重试！";
			        		this.$message.error(message);
			        		setTimeout(()=>{
			        			this.fullscreenLoading = false;
			        		},500);
			        		return false;
			        	}

			        }).catch(err=>{
			        	this.$message.error("内部错误！");
			        	this.empty = "加载失败，稍后重试！";
			        	//console.log(err);
			        	setTimeout(()=>{
			        		this.fullscreenLoading = false;
			        	},500);
			        	return false;
			        })
		        }
		        else{
		        	this.$message.warning("请选择充电卡号!");
		        	return false;
		        };
		        function sort1(arr) {
				for(var j = 0; j < arr.length; j++) {
				for(var i = 0; i < arr.length - 1 - j; i++) {
				if(arr[i] > arr[i + 1]) {
				[arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]
				}
				}
				}
				return arr;
				}

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
				function shuzu(field){
					 var s = "";
					  for (var i = 0; i < field.length; ++i) {
					    s = s + field[i];
					  }
					  return s;
				};
		    },
		    getMore(){
		    	var a = this.key;
		        var pageSize = this.pageSizes;
		        var pageNo = this.currentPage;
		        ////console.log(a);
		        var b = this.cards;
		        var Mcards = this.moreCard;
		        ////console.log(Mcards);
		        if(a[0]!=null){
		        	//this.fullscreenLoading = true;
		        	var dateFrom = this.dateFrom;
			        var dateTo = this.dateTo;
			        var pageSize = this.pageSizes;
			        let dateOne ="";
			        if(dateFrom!=null&&dateFrom!=""){
			        	dateOne = dateFrom;
			        }
			        if(dateFrom==null){
			        	dateFrom = ""
			        }
			        if(dateTo==null){
			        	dateTo = ""
			        }
			        //console.log(this.user,dateFrom,dateTo,Mcards);
			        var c = [];
			        var d = [];
			        var length = a.length;
			        if(length>1){
			        	for(var i = 0;i<Mcards.length;i++){
				        	for(var v=0;v<a.length;v++){
				        		if(Mcards[i].codeOnCard==a[v]){
				        			c.push(Mcards[i].serial);
				        		}
				        	}
				        }
			        }
			        else if(length==1){
			        	var moreM = Mcards.length;
			        	if(moreM==null){
			        		c.push(Mcards.serial);
			        	}
			        	else if(moreM>1&&moreM!=null){
			        		for(var n=0;n<Mcards.length;n++){
			        			if(a[0]==Mcards[n].codeOnCard){
			        				c.push(Mcards[n].serial);
			        			}
			        		}
			        	}
			        	else{
			        		return false;
			        	}
			        }
			        else{
			        	return false;
			        }
			        ////console.log(c);
			        var cardSerial = "";
			        if(c.length>1){
			        	cardSerial = c.join(",");
			        }
			        else if(c.length==1){
			        	cardSerial = c[0];
			        }
			        else{
			        	cardSerial = [];
			        }
			        //console.log(cardSerial);
			        var type = "";
			        if(this.typess=="个人用户"){
			        	if(c.length==1){
			        		type=3;
			        	}
			        	else if(c.length>1){
			        		type = 4;
			        	}
			        }
			        else if(this.typess=="企业用户"){
			        	type=5;
			        }
			        var some = "";
			        if(dateFrom==""){
			        	d.push(type);
			        	d.push(cardSerial);
			        	
			        }
			        else{
			        	d.push(type);
			        	d.push(cardSerial);
			        	d.push(dateFrom);
			        	d.push(dateTo);
			        }
			        d.sort(function(a,b){return a+"">b+""});
			        var e = sort_ASCII(d);
			        //console.log(e);
			        // var g = [];
			        // for(var i=0;i<e.length;i++){
			        // 	g.push(e[i].key);
			        // }
			        // //console.log(g);
			        some = e.join("")+this.user.userKey;
			        //console.log(some);
			        var appKey = this.user.userId + hex_sha1(some);
			        window.open(this.baseURL+"/f/record/rechargeRecord?appKey="+appKey+"&type="+type+"&cardSerial="+cardSerial+"&StartWhen="+dateFrom+"&EndWhen="+dateTo);
			    }
			    else{
			    	this.$message.warning("请选择充电卡号！");
		        	return false;
			    }
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
					//console.log(er);
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
		        d.sort(function(a,b){return a.key+"">b.key+""});
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
		        some = f.join("")+user.userKey;
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
		},
	}
</script>

<style>

</style>