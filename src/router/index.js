import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import first from '../components/views/more/first.vue'
import updatePWD from '../components/views/login/login.vue'
import chargingR from '../components/views/more/chargingRecord.vue'
import consumptionR from '../components/views/more/consumptionRecord.vue'
import charging from '../components/views/more/charging.vue'
import partner from '../components/views/more/partner.vue'
import lossCard from '../components/views/more/lossCard.vue'
import problems from '../components/views/more/problems.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
     	path: '/',
      	name: 'HelloWorld',
      	component: HelloWorld
    },
    {
    	path:"/first",
    	name:"first",
    	component:first
    },
    {
    	path:"/updatePWD",
    	name:'updatePWD',
    	component:updatePWD
    },
    {
    	path:"/chargingR",
    	name:"chargingR",
    	component:chargingR
    },
    {
    	path:'/consumptionR',
    	name:"consumptionR",
    	component:consumptionR
    },
    {
        path:"/charging",
        name:"charging",
        component:charging
    },
    {
        path:"/partner",
        name:"partner",
        component:partner
    },
    {
        path:"/lossCard",
        name:"lossCard",
        component:lossCard
    },
    {
        path:"/problems",
        name:"problems",
        component:problems
    }
  ]
})






