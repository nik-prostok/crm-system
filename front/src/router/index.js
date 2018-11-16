import Vue from 'vue'
import Router from 'vue-router'

import Products from '@/components/menu/Products'
import AddProducts from '@/components/menu/AddProducts'
import EditProduct from '@/components/menu/EditProduct'

import Category from '@/components/menu/Category'
import AddCategory from '@/components/menu/AddCategory'
import EditCategory from '@/components/menu/EditCategory'

import Shops from '@/components/menu/Shops'
import AddShop from '@/components/menu/AddShop'
import EditShop from '@/components/menu/EditShop'

import CategoryIngridients from '@/components/menu/CategoryIngridients'
import AddCategoryIngridients from '@/components/menu/AddCategoryIngridients'

import Ingridients from '@/components/menu/Ingridients'
import AddIngridients from '@/components/menu/AddIngridients'

import Semi from '@/components/menu/Semi'
import AddSemi from '@/components/menu/AddSemi'

import SaleProducts from '@/components/statistic/SaleProducts'
import Sale from '@/components/statistic/Category'

Vue.use(Router)

const routes = [

//*****MENU*****//
//menu//products
{
	path: '/menu/products',
	component: Products,
},
{
	path: '/menu/products/add',
	component: AddProducts
},
{
	path: '/menu/products/edit/:id',
	component: EditProduct
},

//menu//shops
{
	path: '/menu/shops',
	component: Shops,
},
{
	path: '/menu/shops/add',
	component: AddShop,
},
{
	path: '/menu/shops/edit/:id',
	component: EditShop,
},

//menu//category_prod_cards
{
	path: '/menu/category_prod_cards',
	component: Category,
},
{
	path: '/menu/category_prod_cards/add',
	component: AddCategory,
},
{
	path: '/menu/category_prod_cards/edit/:id',
	component: EditCategory,
},

//menu//cat_ingridients
{
	path: '/menu/cat_ingridients',
	component: CategoryIngridients,
},
{
	path: '/menu/cat_ingridients/add',
	component: AddCategoryIngridients,
},

//menu//ingridients
{
	path: '/menu/ingridients',
	component: Ingridients,
},
{
	path: '/menu/ingridients/add',
	component: AddIngridients,
},

//menu//semi
{
	path: '/menu/semi',
	component: Semi,
},
{
	path: '/menu/semi/add',
	component: AddSemi,
},

//*****SALES*****//
{
	path: '/sales/products',
	component: SaleProducts,
},
]

export default new Router({
	mode: 'history',
	routes
})