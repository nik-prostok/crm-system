import Vue from 'vue'
import Router from 'vue-router'

import Products from '@/components/menu/Products'
import AddProducts from '@/components/menu/AddProducts'
import EditProduct from '@/components/menu/EditProduct'

import Category from '@/components/menu/Category'
import AddCategory from '@/components/menu/AddCategory'

import Shops from '@/components/menu/Shops'
import AddShop from '@/components/menu/AddShop'

import CategoryIngridients from '@/components/menu/CategoryIngridients'
import AddCategoryIngridients from '@/components/menu/AddCategoryIngridients'

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
	path: '/menu/shops',
	component: Shops,
},
{
	path: '/menu/shops/add',
	component: AddShop,
},
{
	path: '/menu/category_prod_cards/add',
	component: AddCategory,
},
{
	path: '/menu/products/add',
	component: AddProducts
},
{
	path: '/menu/products/edit/:id',
	component: EditProduct
},
{
	path: '/menu/cat_ingridients',
	component: CategoryIngridients,
},
{
	path: '/menu/cat_ingridients/add',
	component: AddCategoryIngridients,
}
]

export default new Router({
	mode: 'history',
	routes
})