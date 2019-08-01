<template>
	<div class="top_list">
		<div class="common_center">
			<div class="lsft_top">
				<h3>{{name}}</h3>
			</div>
			<div class="right_top">
				<h3>欢迎您，{{admin}} [ <a style="color:#409EFF" @click="back()">退出</a> ]</h3>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name:"top",
		data(){
			return{
				name:"市政公用新能源支付查询系统",
				admin:""
			}
		},
		created(){
			this.ready();
		},
		methods:{
			ready(){
				var a = JSON.parse(localStorage.getItem("user"));
				if(a!=""&&a!=null){
					this.admin = a.userName;
				}
				else{
					this.$router.push({path:"/"});
				}
			},
			back(){
				
				this.$message.success("提示：退出成功！");
				this.$router.push({path:"/"});
			}
		}
	}
</script>

<style>
	.top_list{
		position: fixed;
		top:0;
		left:0;
		background-color: #fff;
		width: 100%;
		height: 60px;
		border-bottom: 1px solid #dfdfdf;
		z-index: 100;
	}
	.common_center{
		width: 1200px;
		margin-left: auto;
		margin-right: auto;
	}
	.lsft_top{
		float:left;
		font-size: 18px;
		line-height: 60px;
	}
	.right_top{
		float:right;
		font-size: 14px;
		line-height: 60px;
	}
	.right_top a{
		cursor: pointer;
	}
	.right_top a:hover{
		text-decoration: underline;

	}
</style>