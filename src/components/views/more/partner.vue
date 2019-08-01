<template>
	<div class="body">
		<v-top></v-top>
		<div class="somes">
			<div class="common_center">
				<div class="chargings">
					<h2 style="margin-left:20px;font-size: 17px;padding-top:20px;margin-bottom:20px;">相关信息：</h2>
					<ul style="margin-left:20px;">
						<li style="margin-bottom:10px;overflow:hidden;">
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
							<span style="float:left;display:block;margin-right:20px;margin-bottom:10px;">
								<h6>总收入：</h6>
								<el-input :disabled="true" v-model="items.income"></el-input>
							</span>
							<span style="float:left;display:block;margin-right:20px;margin-bottom:10px;">
								<h6>总电量：</h6>
								<el-input :disabled="true" v-model="items.charging"></el-input>
							</span>
							<span style="float:left;display:block;margin-right:20px;margin-bottom:10px;">
								<h6>总服务费：</h6>
								<el-input :disabled="true" v-model="items.service"></el-input>
							</span>
						</li>
						<li style="margin-bottom:20px;">
							<div style="overflow:hidden;">
								<el-button style="float:left;" type="primary" icon="el-icon-search" @click.native="ready()">查询</el-button>
							</div>
						</li>
					</ul>
					<div style="width:100%;height:1px;background-color:#f1f1f1;display:block;"></div>
					<el-table
						:data="data"
						style="width: 100%"
						height="350px"
						v-loading="fullscreenLoading"
						:empty-text="empty"
					>
						<el-table-column
					        prop="Code"
					        label="桩号"
					        width="180">
					    </el-table-column>
					    <el-table-column
					        prop="PeakPrice"
					        label="峰电电价"
					        width="120">
					    </el-table-column>
					    <el-table-column
					        prop="PeakDegree"
					        label="峰电量"
					        width="120">
					    </el-table-column>
					    <el-table-column
					        prop="FlatPrice"
					        label="平电电价"
					        width="120">
					    </el-table-column>
					    <el-table-column
					        prop="FlatDegree"
					        label="平电量"
					        width="120">
					    </el-table-column>
					    <el-table-column
					        prop="ValleyPrice"
					        label="谷电电价"
					        width="120">
					    </el-table-column>
					    <el-table-column
					        prop="ValleyDegree"
					        label="谷电量"
					        width="120">
					    </el-table-column>
					    <el-table-column
					        prop="Sharing"
					        label="分成比例"
					        width="120">
					    </el-table-column>
					    <el-table-column
					        label="时间"
					    >
							<template slot-scope="scope">
				        		<p>{{scope.row.StartWhen | formatDate}}</p>
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
					      :disabled="pageOn"
					    >
					    </el-pagination>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import top from '../common/header.vue'
	import {formatDate} from '../../date.js'
	//import Btn from '../common/btn.vue'
	//import "v-top" from '../common/header.vue'
	export default{
		name:"partner",
		data(){
			return{
				userType:false,
				Chargings:[],
				Consumptions:[],
				chargeS:"",
				cards:[],
				data:[],
				fullscreenLoading:false,
				currentPage:1,
				pageSizes:10,
				total:0,
				pageOn:true,
				dateFrom:"",
				dateTo:"",
				empty:"请查询！",
				items:{
					income:"请查询",
					charging:"请查询",
					service:"请查询"
				}
			}
		},
		filters:{
			formatDate(time){
				if(time!=null&&time!=""&&typeof(time)!="underfind"){

					let date = new Date(time);
					return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
				}
				else{
					return "";
				}
			}
		},
		components:{
	    	'v-top':top,
	 	},
		created(){
			//this.ready();
		},
		methods:{
			handleSizeChange(val) {
		        //console.log(`每页 ${val} 条`);
		    },
		    handleCurrentChange(val) {
		        //console.log(`当前页: ${val}`);
		        this.ready();
		    },
			clickLi(item){
				//console.log(item);
			},
			ready(){
				var a = JSON.parse(localStorage.getItem("loginUser"));
				var b = JSON.parse(localStorage.getItem("user"));

				if(a!=""&&a!=null){
					//console.log(a.types,b);
					//var cards = [];
					var dateFrom = this.dateFrom;
					var dateTo = this.dateTo;
					if(dateFrom!=""&&dateTo!=""&&dateFrom!=null&&dateTo!=null&&dateFrom<=dateTo){
						var appkey = b.userId + hex_sha1(b.userKey);
						var c = {
							appKey:appkey
						};
						//console.log(c);
						//console.log(a.types);
						var d = [];
						d.push(this.currentPage);
						d.push(this.pageSizes);
						d.push(dateFrom);
						d.push(dateTo);
						d.sort(function(a,b){return a+"">b+""?1:-1});
						var e = sort_ASCII(d);
						//console.log(e);
						var somea = e.join("");
						//console.log(somea);
						var some = somea+b.userKey;
						//console.log(some,hex_sha1(some));
						var appkey = b.userId + hex_sha1(some);
						var c = {
							pageSize:this.pageSizes,
					       	pageNo:this.currentPage,
							appKey:appkey,
							startDate:dateFrom,
							endDate:dateTo
						};
						//console.log(c);
						this.$axios.post(this.baseURL+"/f/record/getPartnerBill",this.$qs.stringify(c))
						.then(er=>{
							console.log(er);
							var success = er.data.success;
							var message = er.data.message;
							if(success==1){
								var abc = er.data.data.pds.length;
								this.pageOn = false;
								this.data = er.data.data.pds;
								var count = er.data.data.totalCount;
								if(count >0){
									this.total = parseInt(count);
									this.items.charging = er.data.data.totalElectricity;
									this.items.income = er.data.data.totalIncome;
									this.items.service = er.data.data.totalServiceFee;
								}
								else{
									this.$message("暂无数据！");
									this.empty = "暂无数据！";
								}
								//console.log(this.data);
							}
							else if(success ==2){
								this.$message.error("验证失效，请重新登录！");
								this.$router.push({path:"/"});
								return false;
							}
							else{
								this.$message.error(message);
								this.empty = "暂无数据！";
								return false;
							}
						}).catch(err=>{
							this.$message.error("内部出错！");
							//console.log(err);
							this.empty = "内部错误！";
							return false;
						});
					}
					else{
						this.$message.warning("请输入开始时间和结束时间进行检索！");
					}
				}
				else{
					this.$message.error("验证失效，请重新登录！");
					this.$router.push({path:"/"});
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
			},
		},
	}
</script>

<style>
	.chargings{
		height: 650px;
		background-color: #fff;
	}
	.el-input.is-disabled .el-input__inner{
		color:#000;
	}
</style>