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
	deleteCatIng(id){
		return api().post('deleteCatIng', id)
	},

	//Ingridients
	fetchIngridients(){
		return api().get('ingridients')
	},
	addIngridients(ingridient){
		return api().post('ingridients', ingridient)
	},
	
	//Semi
	addSemi(semi){
		return api().post('semi', semi)
	},
	fetchSemi(){
		return api().get('semi')
	},
	

	//Map
	addMap(map){
		return api().post('addmap', map)
	},
	fetchMaps(){
		return api().get('map')
	},
	delMap(id){
		return api().post('deleteCard', id)
	},
	fetchModificators(){
		return api().get('modificators')
	},
}


