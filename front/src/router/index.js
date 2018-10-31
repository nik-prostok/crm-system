import Vue from 'vue'
import Router from 'vue-router'

import Products from '@/components/menu/Products'
import AddProducts from '@/components/menu/AddProducts'
import EditProduct from '@/components/menu/EditProduct'
import Category from '@/components/menu/Category'

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
	path: '/menu/category_prod_cards',
	component: Category,
},
{
	path: '/menu/products/add',
	component: AddProducts
},
{
	path: '/menu/products/edit/:id',
	component: EditProduct
}
]

export default new Router({
	mode: 'history',
	routes
})