<template>
	<div class="body">
		<v-top></v-top>
		<div class="somes">
			<div class="common_center">
				<div class="chargings">
					<h2 style="margin-left:30px;font-size: 17px;padding-top:20px;margin-bottom:20px;">充值界面：</h2>
					<ul style="margin-left:30px;margin-right:30px;">
						<li style="margin-bottom:20px;">
							<h3 style="line-height:50px;font-size: 15px;">填写充值金额：</h3>
							<el-input style="width:300px;" v-model="chargeS" placeholder="请输入金额" clearable></el-input>
						</li>
						<li style="margin-bottom:20px;">
							<h3 style="line-height:50px;font-size: 15px;">选择卡号：</h3>
							<el-select>
								<el-option></el-option>
							</el-select>
						</li>
						
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import top from '../common/header.vue'
	//import Btn from '../common/btn.vue'
	//import "v-top" from '../common/header.vue'
	export default{
		name:"charging",
		data(){
			return{
				userType:false,
				Chargings:[
				],
				Consumptions:[
				],
				chargeS:"",
				cards:[],
				empty:"请查询！",
			}
		},
		components:{
	    	'v-top':top,
	 	},
		created(){
			this.ready();
		},
		methods:{
			clickLi(item){
				console.log(item);
			},
			ready(){
				var a = JSON.parse(localStorage.getItem("loginUser"));
				var b = JSON.parse(localStorage.getItem("user"));
				console.log(b);
				if(a!=""&&a!=null){
					console.log(a.types);
					//var cards = [];
					var appkey = b.userId + hex_sha1(b.userKey);
					var c = {
						appKey:appkey
					};
					console.log(c);
					this.$axios.post("http://192.168.0.250:8086/charging/f/record/getPartnerBill",this.$qs.stringify(c))
					.then(er=>{
						console.log(er);
						var success = er.data.success;
						var message = er.data.message;
						
					}).catch(err=>{
						//this.$message.error("内部出错！");
						console.log(err);
						return false;
					});
				}
			},

		},
	}
</script>

<style>
	.chargings{
		height: 650px;
		background-color: #fff;
	}
</style>