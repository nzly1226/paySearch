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
							<i class="iconfonts" style="font-size:28px; color:#409EFF">&#xe602;</i>
							<h3 style="line-height:40px;font-size: 16px;">常见问题：</h3>
						</div>
						<div class="loss">
							<el-collapse style="margin:20px;" v-model="activeNames" @change="handleChange">
							  <el-collapse-item title="1、联系方式" name="1">
							    <div>联系电话：400-928-8889</div>
							    <div>联系地址：江苏省无锡市锡山区安镇街道东盛路666号</div>
							  </el-collapse-item>
							  <el-collapse-item title="2、申请注册材料" name="2">
							    <div>个人用户：手机app注册，或者携带本人有效证件（身份证）来我司进行注册开卡。</div>
							    <div>企业用户：企业有效证件、经办人有效证件，银行账号及税号信息来我司进行开卡注册。</div>
							  </el-collapse-item>
							  <el-collapse-item title="3、挂失补办一般流程" name="3">
							    <div>（1）联系我司或在平台上自行锁卡后再次联系</div>
							    <div>（2）携带有效证件（企事业单位携带企业有效证件、发票、经办人有效证件）</div>
							    <div>（3）来我司进行申请挂失补办</div>
							    <div>（4）申请日期：20个工作日（包含快递寄出到收到时间）</div>
							    <div>（5）取卡支持快递邮寄（仅支持顺丰到付）</div>
							    <div>（6）补办收取工本费20元/人（不含邮费）</div>
							  </el-collapse-item>
							  <el-collapse-item title="4、充值一般问题" name="4">
							    <div>（1）充值只支持单卡充值，充值金额不限（必须为正整数）</div>
							    <div>（2）充值时看清选择卡号及金额</div>
							    <div>（3）充值出错需及时联系我司或本人携带有效证件来我司进行处理</div>
							  </el-collapse-item>
							  <el-collapse-item title="5、内部折扣卡审核" name="5">
							    <div>（1）一般充值卡不需要审核续费，内部折扣卡审核后的一般有效期为2年，2年后需要再次审核</div>
							    <div>（2）续费时携带本人有效证件及内部折扣卡来我司进行审核</div>
							  </el-collapse-item>
							</el-collapse>
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
		name:"problems",
		data(){
			return{
				btns:[
					{id:"0",name:"数据总览",icon:"icon-jiaoyizonglan",isBtn:"",to:"/first"},
					{id:"1",name:"充值记录",icon:"icon-xiaofei01",isBtn:"",to:"/chargingR"},
					{id:"2",name:"消费记录",icon:"icon-chuanyuejilu",isBtn:"",to:"/consumptionR"},
					{id:"3",name:"挂失补办",icon:"icon-yishibuzheng",isBtn:"",to:"/lossCard"},
					{id:"4",name:"常见问题",icon:"icon-changjianwenti",isBtn:"btn_btn",to:"/problems"},
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
			    activeNames: [],
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
			
		},
		methods:{
			handleChange(val) {
		        //console.log(val);
		    }
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