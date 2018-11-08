import api from '@/services/api'

export default {
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
	fetchCategories () {
		return api().get('categories')
	},
	fetchShops () {
		return api().get('shops')
	},
	addShop(shop){
		return api().post('shops', shop)
	},
	addCategory(category){
		return api().post('categories', category)
	},
	addCategoryIng(category){
		return api().post('catIngrid', category)
	},
	fetchCategoryIng(){
		return api().get('catIngrid')
	},
	deleteOnlyProduct (id) {
		return api().post('deleteOnlyProduct', {id: id})
	},
	deleteOnlyPhoto (id) {
		return api().post('deleteOnlyPhoto', {id: id})
	},
}