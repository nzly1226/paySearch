<template>
	<div class="btn">
		<ul class="btn_ul">
			<li v-for="li in btns">
				<i v-if="li.icon != ''" class="iconfont" :class="li.icon" style="16px;"></i>
				<h4>{{li.name}}</h4>
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		name:"btn",
		data(){
			return{
				btns:[
					{id:"0",name:"数据总览",icon:"",isBtn:false},
					{id:"1",name:"充值记录",icon:"",isBtn:false},
					{id:"2",name:"消费记录",icon:"",isBtn:false},
				],
			}
		}
	}
</script>

<style>
	.btn{
		color:#000;
		width: 235px;
		height: 100%;
		background-color: #fff;
		display: block;
		float:left;
	}
	.btn_ul li{
		width: 100%;
		height: 40px;
		line-height: 40px;
	}
</style>