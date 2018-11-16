import api from '@/services/api'

export default {
	//Products
	fetchProducts () {
		return api().get('productsMod')
	},
	addProduct (params) {
		return api().post('productsMod',params,{
			emulateJSON: true
		})
	},
	deleteProduct(id){
		return api().post('deleteProduct', id)
	},
	deleteOnlyProduct (id) {
		return api().post('deleteOnlyProduct', {id: id})
	},
	deleteOnlyPhoto (id) {
		return api().post('deleteOnlyPhoto', {id: id})
	},

	//Categories
	fetchCategories () {
		return api().get('categories')
	},
	addCategory(category){
		return api().post('categories', category)
	},
	deleteCategory(id) {
		return api().post('deleteCategory', {id: id})
	},

	//Shops
	fetchShops () {
		return api().get('shops')
	},
	addShop(shop){
		return api().post('shops', shop)
	},
	
	//CategoryIngridients
	addCategoryIng(category){
		return api().post('catIngrid', category)
	},
	fetchCategoryIng(){
		return api().get('catIngrid')
	},

	//Ingridients
	fetchIngridients(){
		return api().get('ingridients')
	},
	addIngridients(){
		return api().post('ingridients')
	},
	
}