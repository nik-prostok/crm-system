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
	}
}