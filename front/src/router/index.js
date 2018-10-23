import Vue from 'vue'
import Router from 'vue-router'

import Products from '@/components/menu/Products'
import AddProducts from '@/components/menu/AddProducts'

import SaleProducts from '@/components/statistic/SaleProducts'
import Sale from '@/components/statistic/Category'


Vue.use(Router)

const routes = [
{
	path: '/sales/products',
	component: SaleProducts,
},
{
	path: '/menu/products',
	component: Products,
},
{
	path: '/menu/products/add',
	component: AddProducts
}
]

export default new Router({
	mode: 'history',
	routes
})